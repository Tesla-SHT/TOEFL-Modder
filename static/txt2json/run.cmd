rem for %%i in (*.json) do (del "%%i")
for %%i in (*.txt) do (python txt2json.py "%%i")
pause