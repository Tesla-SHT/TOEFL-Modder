for %%i in (*.json) do (del "%%i")
for %%i in (*.csv) do (csv2json.py "%%i")
pause