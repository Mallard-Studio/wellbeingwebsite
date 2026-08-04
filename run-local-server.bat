@echo off
cd /d "%~dp0"
echo Serving %cd% at http://localhost:8000/
start http://localhost:8000/axis-checkin/
python -m http.server 8000
