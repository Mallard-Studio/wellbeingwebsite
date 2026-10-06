import { FilesetResolver, PoseLandmarker } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs';

const MP    = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1';
const LITE  = 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
const FULL  = 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task';

const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const COLORS = { red:css('--w-red'), yellow:css('--w-yellow'), blue:css('--w-blue'), green:css('--w-green') };
const $ = id => document.getElementById(id);
const canvas = (w = 1, h = 1) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };

const video = $('cam'), out = $('out'), ctx = out.getContext('2d');
let facing = 'environment', stream, busy = false;

// ---------------------------------------------------------------------------
// Models. All on CPU: on the test Samsung the GPU path returns an empty cut-out.
// The live view uses the small model on a 360px copy, it is only a viewfinder.
// The saved photo is made afterwards with the bigger model at full size.
let fileset, livePose, photoPose;
async function createPose(model, runningMode) {
  fileset = fileset || await FilesetResolver.forVisionTasks(MP + '/wasm');
  return PoseLandmarker.createFromOptions(fileset, { baseOptions:{ modelAssetPath:model, delegate:'CPU' },
    runningMode, numPoses:1, outputSegmentationMasks:true });
}
const getPhotoPose = async () => photoPose = photoPose || await createPose(FULL, 'IMAGE');

function readPose(r) {
  const m = r.segmentationMasks && r.segmentationMasks[0];
  return { lm:r.landmarks[0] || null, mask:m ? { a:m.getAsFloat32Array().slice(), w:m.width, h:m.height } : null };
}

// ---------------------------------------------------------------------------
// Camera. Frames are drawn already mirrored for the front camera, so everything
// after this point works in "what you see" coordinates and nothing flips again.
async function openCamera() {
  if (stream) stream.getTracks().forEach(t => t.stop());
  stream = await navigator.mediaDevices.getUserMedia({ audio:false,
    video:{ facingMode:facing, width:{ ideal:1920 }, height:{ ideal:1080 } } });
  video.srcObject = stream;
  await video.play();
  liveGeo.ok = false;
}
function drawFrame(g, src, w, h, mirror) {
  g.save();
  if (mirror) { g.translate(w, 0); g.scale(-1, 1); }
  g.drawImage(src, 0, 0, w, h);
  g.restore();
}

$('start').onclick = async () => {
  const btn = $('start'), status = $('status');
  btn.disabled = true;
  try {
    status.textContent = 'Asking for the camera...';
    await openCamera();
    status.textContent = 'Loading...';
    if (!livePose) [livePose] = await Promise.all([createPose(LITE, 'VIDEO'), document.fonts.load('700 40px Comfortaa')]);
    $('intro').style.display = 'none';
    $('bar').style.display = 'flex';
    requestAnimationFrame(loop);
    getPhotoPose().catch(console.warn);   // warm up the big model while the user frames the shot
  } catch (e) {
    console.error(e);
    btn.disabled = false;
    status.textContent = e.name === 'NotAllowedError'
      ? 'Camera blocked. Allow it in the browser settings and try again.'
      : 'Could not start: ' + e.message;
  }
};
$('flip').onclick = async () => { if (busy) return; facing = facing === 'user' ? 'environment' : 'user'; await openCamera(); };

// ---------------------------------------------------------------------------
// Live viewfinder
const LIVE_W = 360;
const small = canvas(), sctx = small.getContext('2d', { willReadFrequently:true });
const liveGeo = { ok:false, a:0 };
let lastTime = -1;

function loop() {
  requestAnimationFrame(loop);
  if (busy || video.readyState < 2 || video.currentTime === lastTime) return;
  lastTime = video.currentTime;
  const mirror = facing === 'user';
  const vw = video.videoWidth, vh = video.videoHeight;
  // the preview canvas is the 720px-wide version of the frame, plenty for a phone screen
  const W = Math.min(720, vw), H = Math.round(vh * W / vw);
  if (out.width !== W || out.height !== H) { out.width = W; out.height = H; }
  const sw = LIVE_W, sh = Math.round(vh * sw / vw);
  if (small.width !== sw || small.height !== sh) { small.width = sw; small.height = sh; }
  drawFrame(sctx, video, sw, sh, mirror);
  let res = { lm:null, mask:null };
  livePose.detectForVideo(small, performance.now(), r => { res = readPose(r); });

  drawFrame(ctx, video, W, H, mirror);
  const seen = visible(res.lm);
  $('hint').style.display = seen ? 'none' : 'block';
  liveGeo.a += ((seen ? 1 : 0) - liveGeo.a) * 0.2;
  if (seen) smoothGeo(liveGeo, geometry(res.lm, W, H), 0.45);
  if (liveGeo.ok && liveGeo.a > 0.02)
    compose(ctx, small, W, H, liveGeo, res.mask ? [res.mask] : [], res.lm, { gw:LIVE_W, r:4, t:performance.now() / 1000, alpha:liveGeo.a });
}

// ---------------------------------------------------------------------------
// Geometry: where the wings and the label go, from the pose landmarks.
const visible = lm => !!lm && lm[11].visibility > 0.5 && lm[12].visibility > 0.5;
function geometry(lm, W, H) {
  const l = { x:lm[11].x * W, y:lm[11].y * H }, r = { x:lm[12].x * W, y:lm[12].y * H };
  const s = Math.hypot(l.x - r.x, l.y - r.y);
  let ux = (l.x - r.x) / s, uy = (l.y - r.y) / s;
  // the logo's red side always lands on the viewer's left, whichever way the person faces
  if (ux < 0) { ux = -ux; uy = -uy; }
  const mx = (l.x + r.x) / 2, my = (l.y + r.y) / 2;
  // anchor between the shoulder blades, a little below the shoulder line
  const x = mx - uy * 0.3 * s, y = my + ux * 0.3 * s;
  // top of the head: carry on past the nose by about half the shoulders-to-nose distance
  const nx = lm[0].x * W, ny = lm[0].y * H;
  return { ok:true, x, y, s, ux, uy, hx:nx + (nx - mx) * 0.6, hy:ny + (ny - my) * 0.6 };
}
function smoothGeo(cur, next, k) {
  if (!cur.ok) { Object.assign(cur, next); return; }
  for (const key of ['x','y','s','ux','uy','hx','hy']) cur[key] += (next[key] - cur[key]) * k;
  const n = Math.hypot(cur.ux, cur.uy); cur.ux /= n; cur.uy /= n;
}

// ---------------------------------------------------------------------------
// Compose: wings behind the person, label above the head. Shared by the live
// view and the saved photo, so what you frame is what you get.
//   guide  the frame the cut-out is refined against (any size, same picture)
//   masks  pose cut-outs, lm  landmarks for the limb skeleton
//   gw     width the cut-out is refined at, r  filter radius at that width
const wingCv = canvas(), wctx = wingCv.getContext('2d');
const maskCv = canvas(), mctx = maskCv.getContext('2d');
function compose(g, guide, W, H, geo, masks, lm, { gw, r, t = 0, alpha = 1 }) {
  if (wingCv.width !== W || wingCv.height !== H) { wingCv.width = W; wingCv.height = H; }
  wctx.setTransform(1, 0, 0, 1, 0, 0);
  wctx.globalCompositeOperation = 'source-over';
  wctx.clearRect(0, 0, W, H);
  drawWings(wctx, geo, t);

  if (masks.length) {
    const gh = Math.round(H * gw / W);
    const q = refineMask(guide, masks, lm, gw, gh, r, 0.004);
    if (maskCv.width !== gw || maskCv.height !== gh) { maskCv.width = gw; maskCv.height = gh; }
    const img = mctx.createImageData(gw, gh), d = img.data;
    for (let i = 0, j = 3; i < q.length; i++, j += 4) {
      const v = Math.min(1, Math.max(0, (q[i] - 0.3) / 0.4));     // firm up the edge
      d[j] = (1 - v * v * (3 - 2 * v)) * 255;
    }
    mctx.putImageData(img, 0, 0);
    wctx.setTransform(1, 0, 0, 1, 0, 0);
    wctx.globalCompositeOperation = 'destination-in';
    wctx.imageSmoothingQuality = 'high';
    wctx.drawImage(maskCv, 0, 0, W, H);
  }

  g.save();
  g.globalAlpha = alpha;
  g.drawImage(wingCv, 0, 0);
  drawLabel(g, { ...geo, hy:Math.min(geo.hy, headTop(masks[0], geo, W, H)) }, W);
  g.restore();
}

// The real top of the head (hair, a raised hand) from the cut-out: the highest person
// pixel within a shoulder width either side of the head. The nose-based guess misses tall hair.
function headTop(mask, geo, W, H) {
  if (!mask) return Infinity;
  const { a, w, h } = mask, sx = w / W, sy = h / H;
  const x0 = Math.max(0, ((geo.hx - geo.s) * sx) | 0), x1 = Math.min(w - 1, ((geo.hx + geo.s) * sx) | 0);
  const yEnd = Math.min(h, (geo.hy * sy + geo.s * 0.6 * sy) | 0);
  for (let y = 0; y < yEnd; y++)
    for (let x = x0; x <= x1; x++) if (a[y * w + x] > 0.5) return y / sy;
  return Infinity;
}

// The finished photo: the same wings, plus everything that makes it look shot rather than pasted.
function composeFinal(g, src, W, H, geo, masks, lm) {
  const s = geo.s, t = Math.PI / 4.8;   // t: wings fully open
  const layer = () => { const c = canvas(W, H); return [c, c.getContext('2d')]; };

  // who is the person: refined cut-out at full size, as an alpha mask
  const [person, pg] = layer();
  if (masks.length) {
    const q = refineMask(src, masks, lm, W, H, Math.max(6, Math.round(W / 100)), 0.004);
    const img = pg.createImageData(W, H), d = img.data;
    for (let i = 0, j = 3; i < q.length; i++, j += 4) {
      const v = Math.min(1, Math.max(0, (q[i] - 0.3) / 0.4));
      d[j] = v * v * (3 - 2 * v) * 255;
    }
    pg.putImageData(img, 0, 0);
  }

  // 1. background a touch out of focus, like portrait mode. The person is cut out of it
  // first (a little wider than the mask), so the blur cannot smear a ghost of them around the edge.
  const blurPx = Math.max(2, W / 260);
  g.drawImage(src, 0, 0);
  const [bg, bgc] = layer();
  bgc.drawImage(src, 0, 0);
  bgc.globalCompositeOperation = 'destination-out';
  bgc.filter = `blur(${blurPx}px)`;
  for (let i = 0; i < 3; i++) bgc.drawImage(person, 0, 0);
  g.save(); g.filter = `blur(${blurPx}px)`;
  for (let i = 0; i < 3; i++) g.drawImage(bg, 0, 0);   // stacked, so the gap the person left fills in
  g.restore();

  // 2. wings with the finish, cut out where the person is
  const [wings, wg] = layer();
  drawWings(wg, geo, t, true);
  sparkles(wg, geo, W, H);
  wg.globalCompositeOperation = 'destination-out'; wg.drawImage(person, 0, 0);
  // 3. the person casts a soft shadow onto the wings
  const [shadow, sg] = layer();
  sg.filter = `blur(${s * 0.07}px)`; sg.drawImage(person, s * 0.05, s * 0.07);
  sg.filter = 'none'; sg.globalCompositeOperation = 'source-in'; sg.fillStyle = '#000'; sg.fillRect(0, 0, W, H);
  wg.globalCompositeOperation = 'source-atop'; wg.globalAlpha = 0.35; wg.drawImage(shadow, 0, 0);
  wg.globalAlpha = 1;
  g.drawImage(wings, 0, 0);

  // 4. the person, sharp
  const [cut, cg] = layer();
  cg.drawImage(src, 0, 0); cg.globalCompositeOperation = 'destination-in'; cg.drawImage(person, 0, 0);
  g.drawImage(cut, 0, 0);

  // 5. light wrap: a little of the wing colour spills onto the body edge
  const [wrap, rg] = layer();
  rg.filter = `blur(${s * 0.06}px)`; rg.drawImage(wings, 0, 0);
  rg.filter = 'none'; rg.globalCompositeOperation = 'destination-in'; rg.drawImage(person, 0, 0);
  g.save(); g.globalCompositeOperation = 'screen'; g.globalAlpha = 0.55; g.drawImage(wrap, 0, 0); g.restore();

  // 6. grade: a little contrast and colour, then a soft vignette
  const [graded, gg] = layer();
  gg.filter = 'contrast(1.06) saturate(1.12) brightness(1.02)'; gg.drawImage(g.canvas, 0, 0);
  g.drawImage(graded, 0, 0);
  const vig = g.createRadialGradient(W / 2, H * 0.45, Math.min(W, H) * 0.35, W / 2, H * 0.45, Math.hypot(W, H) * 0.6);
  vig.addColorStop(0, 'rgba(0,0,0,0)'); vig.addColorStop(1, 'rgba(0,0,0,.32)');
  g.fillStyle = vig; g.fillRect(0, 0, W, H);

  drawLabel(g, { ...geo, hy:Math.min(geo.hy, headTop(masks[0], geo, W, H)) }, W);
}

// A few four-point sparkles around the wings, like the one at the centre of the logo.
// Seeded from the pose so the same photo always gets the same sparkles.
function sparkles(g, geo, W, H) {
  let seed = Math.floor(geo.x * 7 + geo.y * 13) || 1;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  g.save();
  for (let i = 0; i < 14; i++) {
    const ang = rnd() * Math.PI * 2, dist = geo.s * (1.4 + rnd() * 1.6);
    const x = geo.x + Math.cos(ang) * dist * 1.25, y = geo.y + Math.sin(ang) * dist - geo.s * 0.4;
    if (x < 0 || y < 0 || x > W || y > H) continue;
    const r = geo.s * (0.025 + rnd() * 0.05);
    g.shadowColor = '#fff'; g.shadowBlur = r * 3; g.fillStyle = 'rgba(255,255,255,.95)';
    g.beginPath();
    g.moveTo(x, y - r * 2);
    g.quadraticCurveTo(x, y, x + r * 2, y); g.quadraticCurveTo(x, y, x, y + r * 2);
    g.quadraticCurveTo(x, y, x - r * 2, y); g.quadraticCurveTo(x, y, x, y - r * 2);
    g.fill();
  }
  g.restore();
}

// Guided filter (He et al. 2010). The pose model thinks at 256px, so its edge is blocky.
// This snaps it onto the real edges of the frame.
const gf = { cv:canvas(), n:0 };
gf.ctx = gf.cv.getContext('2d', { willReadFrequently:true });
function refineMask(guide, masks, lm, w, h, r, eps) {
  const n = w * h;
  if (gf.n !== n) {
    gf.n = n; gf.cv.width = w; gf.cv.height = h;
    for (const k of ['I','p','Ip','II','mI','mp','mIp','mII','a','b','tmp']) gf[k] = new Float32Array(n);
  }
  gf.ctx.drawImage(guide, 0, 0, w, h);
  const px = gf.ctx.getImageData(0, 0, w, h).data;
  const limbs = limbPrior(lm, w, h);
  const { I, p, Ip, II, mI, mp, mIp, mII, a, b, tmp } = gf;
  for (let y = 0, i = 0; y < h; y++) {
    for (let x = 0; x < w; x++, i++) {
      const gray = (px[i * 4] * 0.299 + px[i * 4 + 1] * 0.587 + px[i * 4 + 2] * 0.114) / 255;
      // person = the more confident of: the pose cut-out, the limb skeleton
      let v = limbs ? limbs[i * 4] / 255 : 0;
      for (const f of masks) {
        const fv = f.a[Math.min(f.h - 1, (y * f.h / h) | 0) * f.w + Math.min(f.w - 1, (x * f.w / w) | 0)];
        if (fv > v) v = fv;
      }
      I[i] = gray; p[i] = v; Ip[i] = gray * v; II[i] = gray * gray;
    }
  }
  box(I, mI, w, h, r, tmp); box(p, mp, w, h, r, tmp); box(Ip, mIp, w, h, r, tmp); box(II, mII, w, h, r, tmp);
  for (let i = 0; i < n; i++) {
    const va = mII[i] - mI[i] * mI[i], cov = mIp[i] - mI[i] * mp[i];
    a[i] = cov / (va + eps); b[i] = mp[i] - a[i] * mI[i];
  }
  box(a, mI, w, h, r, tmp); box(b, mp, w, h, r, tmp);
  for (let i = 0; i < n; i++) p[i] = mI[i] * I[i] + mp[i];
  return p;
}
// Arms and legs drawn as lines thinner than a real limb, so a posed arm always stays in front
// of the wings. The guided filter then grows them out to the real edge of the arm.
const LIMBS = [[11,13],[13,15],[15,19],[15,17],[12,14],[14,16],[16,20],[16,18],[23,25],[25,27],[24,26],[26,28]];
const pr = { cv:canvas() };
pr.ctx = pr.cv.getContext('2d', { willReadFrequently:true });
function limbPrior(lm, w, h) {
  if (!lm) return null;
  if (pr.cv.width !== w || pr.cv.height !== h) { pr.cv.width = w; pr.cv.height = h; }
  const g = pr.ctx;
  g.clearRect(0, 0, w, h);
  const sh = Math.hypot((lm[11].x - lm[12].x) * w, (lm[11].y - lm[12].y) * h);
  g.strokeStyle = '#fff'; g.lineCap = 'round'; g.lineWidth = Math.max(2, sh * 0.12);
  g.beginPath();
  for (const [a, b] of LIMBS) {
    if (lm[a].visibility < 0.5 || lm[b].visibility < 0.5) continue;
    g.moveTo(lm[a].x * w, lm[a].y * h); g.lineTo(lm[b].x * w, lm[b].y * h);
  }
  g.stroke();
  return g.getImageData(0, 0, w, h).data;
}
// mean over a (2r+1) square, separable running sum
function box(src, dst, w, h, r, tmp) {
  for (let y = 0; y < h; y++) {
    const o = y * w; let s = 0;
    for (let x = 0; x <= r && x < w; x++) s += src[o + x];
    for (let x = 0; x < w; x++) {
      tmp[o + x] = s / (Math.min(w - 1, x + r) - Math.max(0, x - r) + 1);
      if (x + r + 1 < w) s += src[o + x + r + 1];
      if (x - r >= 0) s -= src[o + x - r];
    }
  }
  for (let x = 0; x < w; x++) {
    let s = 0;
    for (let y = 0; y <= r && y < h; y++) s += tmp[y * w + x];
    for (let y = 0; y < h; y++) {
      dst[y * w + x] = s / (Math.min(h - 1, y + r) - Math.max(0, y - r) + 1);
      if (y + r + 1 < h) s += tmp[(y + r + 1) * w + x];
      if (y - r >= 0) s -= tmp[(y - r) * w + x];
    }
  }
}

// ---------------------------------------------------------------------------
// Wings: the logo, one quarter per wing, in shoulder-width units, root at (0,0).
function drawWings(g, geo, t, fx = false) {
  const { x, y, s, ux, uy } = geo;
  const flap = 0.9 + 0.1 * Math.sin(t * 2.4);
  g.setTransform(ux * s, uy * s, -uy * s, ux * s, x, y);
  for (const side of [1, -1]) {
    g.save();
    g.scale(side * flap, 1);
    upperWing(g, side > 0 ? COLORS.yellow : COLORS.red, fx && s);
    lowerWing(g, side > 0 ? COLORS.green : COLORS.blue, fx && s);
    g.restore();
  }
  g.setTransform(1, 0, 0, 1, 0, 0);
}
// fxPx: shoulder width in pixels when the finished look is on, false for the plain live version
function upperWing(g, color, fxPx) {
  const x0 = 0.04, w = 2.1, y1 = -0.04, h = 1.9;
  const path = new Path2D();
  path.roundRect(x0, y1 - h, w, h, [0.7, 0, 0.75, 0.04]); // inner-top, outer-top (sharp), outer-bottom, root
  wing(g, path, color, [x0 + w, y1 - h], [x0 + w * 0.62, y1 - h * 0.7, h * 0.35], fxPx);
}
function lowerWing(g, color, fxPx) {
  const x0 = 0.04, w = 1.6, y0 = 0.04, h = 1.35;
  const path = new Path2D();
  path.roundRect(x0, y0, w, h, [0.04, 0.5, 0.5, 0.5]);
  wing(g, path, color, [x0 + w, y0 + h], [x0 + w * 0.55, y0 + h * 0.5, h * 0.3], fxPx);
}
function wing(g, path, color, tip, [sx, sy, sr], fxPx) {
  const grad = g.createLinearGradient(0, 0, tip[0], tip[1]);
  grad.addColorStop(0, '#ffffff'); grad.addColorStop(1, color);
  g.save();
  if (fxPx) { g.shadowColor = color; g.shadowBlur = fxPx * 0.3; }     // soft glow in the wing colour
  g.fillStyle = grad; g.fill(path);
  g.restore();
  if (fxPx) {
    const deep = shade(color, 0.55);
    g.save();
    g.clip(path);
    // darker band along the edge, like a real wing border
    g.lineWidth = 0.16; g.strokeStyle = rgba(deep, 0.28); g.stroke(path);
    g.lineWidth = 0.05; g.strokeStyle = rgba(deep, 0.3); g.stroke(path);
    // sheen
    const sheen = g.createRadialGradient(sx, sy, 0, sx, sy, sr);
    sheen.addColorStop(0, 'rgba(255,255,255,.45)'); sheen.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = sheen; g.fillRect(sx - sr, sy - sr, sr * 2, sr * 2);
    g.restore();
  }
  g.lineWidth = 0.07; g.lineJoin = 'round'; g.strokeStyle = '#ffffff'; g.stroke(path);
}
const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const shade = (h, k) => hexRgb(h).map(v => Math.round(v * k));
const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

// "Wellbeing / hero" above the head. Bold with a dark outline so it reads on any background.
function drawLabel(g, geo, W) {
  // two lines take about 2.6 font sizes with the gap to the head; in a close-up the
  // text shrinks to fit the room above the head instead of landing on the face
  const margin = W * 0.03;
  const size = Math.min(geo.s * 0.6, W * 0.16, (geo.hy - margin) / 2.6);
  if (size < 12) return;
  const wingTop = geo.y - 1.94 * geo.s;
  const y2 = Math.max(size * 1.9 + margin, Math.min(geo.hy - size * 0.7, wingTop - size * 0.35)), y1 = y2 - size * 1.1;
  const x = Math.min(W - margin, Math.max(margin, geo.hx));
  g.save();
  g.font = `700 ${size}px Comfortaa, system-ui, sans-serif`;
  g.textAlign = 'center'; g.textBaseline = 'alphabetic';
  // clamp so a head near the edge does not push the words off the picture
  const half = g.measureText('Wellbeing').width / 2;
  const cx = Math.min(W - margin - half, Math.max(margin + half, x));
  g.lineJoin = 'round'; g.lineWidth = size * 0.16; g.strokeStyle = 'rgba(0,0,0,.6)';
  g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = size * 0.3;
  g.strokeText('Wellbeing', cx, y1); g.strokeText('hero', cx, y2);
  g.shadowColor = 'transparent';
  g.fillStyle = '#ffffff';
  g.fillText('Wellbeing', cx, y1);
  // same gradient as the landing page hero's last line
  const w = g.measureText('hero').width;
  const grad = g.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0);
  ['#ff4f4f', '#ffd84d', '#74d178', '#5b6dff'].forEach((c, i) => grad.addColorStop(i / 3, c));
  g.fillStyle = grad;
  g.fillText('hero', cx, y2);
  g.restore();
}

// ---------------------------------------------------------------------------
// Capture
$('shutter').onclick = () => { if (!busy) takePhoto(); };

function showBusy(text, frac) {
  $('busy').style.display = text ? 'flex' : 'none';
  if (text) { $('busy-text').textContent = text; $('busy-fill').style.width = Math.round((frac || 0) * 100) + '%'; }
}
const nextPaint = () => new Promise(r => requestAnimationFrame(() => setTimeout(r, 0)));

// Photo: grab the sharpest frame the camera gives, then do the whole thing again, properly.
const PHOTO_MAX = 2048;
async function grabStill() {
  const track = stream.getVideoTracks()[0];
  if (window.ImageCapture) {
    try {
      const blob = await Promise.race([new ImageCapture(track).takePhoto(),
        new Promise((_, no) => setTimeout(() => no(new Error('slow')), 3000))]);
      return await createImageBitmap(blob);
    } catch (e) { console.warn('takePhoto failed, using the video frame', e); }
  }
  return createImageBitmap(video);
}
async function takePhoto() {
  busy = true;
  const f = $('flash'); f.style.opacity = 1; setTimeout(() => f.style.opacity = 0, 120);
  try {
    const still = await grabStill();
    showBusy('Making your photo...', 0.2); await nextPaint();
    const k = Math.min(1, PHOTO_MAX / Math.max(still.width, still.height));
    const W = Math.round(still.width * k), H = Math.round(still.height * k);
    const src = canvas(W, H);
    drawFrame(src.getContext('2d'), still, W, H, facing === 'user');
    const model = await getPhotoPose();
    showBusy('Making your photo...', 0.45); await nextPaint();
    const res = readPose(model.detect(src));
    const final = canvas(W, H), fg = final.getContext('2d');
    fg.drawImage(src, 0, 0);
    if (visible(res.lm)) {
      showBusy('Making your photo...', 0.7); await nextPaint();
      composeFinal(fg, src, W, H, geometry(res.lm, W, H), res.mask ? [res.mask] : [], res.lm);
    }
    const blob = await new Promise(r => final.toBlob(r, 'image/jpeg', 0.95));
    review(blob, visible(res.lm) ? '' : 'No one in the picture, so no wings this time.');
  } catch (e) {
    console.error(e); alertBar('Could not make the photo: ' + e.message);
  } finally { showBusy(''); busy = false; }
}

function alertBar(msg) { const h = $('hint'); h.textContent = msg; h.style.display = 'block'; }

// ---------------------------------------------------------------------------
// Review and save. A web page cannot write into the Photos app directly:
// Android saves to Downloads (Gallery and Google Photos pick it up), iPhone needs the share sheet.
const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
let current = null;
function review(blob, note = '') {
  const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  current = new File([blob], `wellbeing-hero-${stamp}.jpg`, { type:blob.type });
  const el = document.createElement('img');
  el.src = URL.createObjectURL(blob);
  $('media').replaceChildren(el);
  $('review').style.display = 'flex';
  if (isIOS) {
    $('save').textContent = 'Save';
    $('saved').textContent = note || 'Tap Save, then Save Image.';
  } else {
    download(current);
    $('save').textContent = 'Share';
    $('saved').textContent = note || 'Saved to your phone.';
  }
}
function download(file) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file); a.download = file.name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
$('save').onclick = async () => {
  if (navigator.canShare && navigator.canShare({ files:[current] })) {
    try { await navigator.share({ files:[current] }); } catch (e) { /* closed the sheet */ }
  } else download(current);
};
$('done').onclick = () => { $('review').style.display = 'none'; $('media').replaceChildren(); };
