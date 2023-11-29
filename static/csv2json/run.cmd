for %%i in (*.json) do (del "%%i")
for %%i in (*.csv) do (python csv2json.py "%%i")
pause