@echo off
cd /d "%~dp0"
echo Starting MOFIXA at http://127.0.0.1:8000
echo Keep this window open. Press Ctrl+C to stop.
echo.
start "" "http://127.0.0.1:8000"
python -m http.server 8000
if errorlevel 1 (
  echo Python not found. Trying py launcher...
  py -m http.server 8000
)
pause
