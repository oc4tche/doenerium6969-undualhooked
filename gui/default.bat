@echo off
setlocal enabledelayedexpansion

set "sourcePath=..\build\App.exe"
set "destinationPath=..\App.exe"

copy "%sourcePath%" "%destinationPath%"
if %errorlevel% neq 0 (
    echo Error copying the file.
    exit /b 1
)

del "%sourcePath%"
if %errorlevel% neq 0 (
    echo Error deleting the source file.
    exit /b 1
)

set "charset=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
set "randomString="

for /L %%i in (1,1,10) do (
    set /a "randIdx=!random! %% 62"
    for /f %%a in ('echo !randIdx!') do set "randomChar=!charset:~%%a,1!"
    set "randomString=!randomString!!randomChar!"
)

set "newName=Rename_!randomString!.exe"
rename "%destinationPath%" "!newName!"
if %errorlevel% neq 0 (
    echo Error renaming the file.
    exit /b 1
)

set "fullPath=%~dp0%newName%"
powershell -command "Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.Interaction]::MsgBox('File builded successfully to: %fullPath%', 'Information', 'Success')"

exit /b 0
