for %%i in (*.json) do (del "%%i")
for %%i in (*.txt) do (txt2json.py "%%i")
pause