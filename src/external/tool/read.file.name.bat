@echo off

SETLOCAL ENABLEDELAYEDEXPANSION

cls

set out=file.name.txt

echo ========================================
echo 1. absolute path + file name
echo 2. relative path + file name
echo 3. only file name
echo ========================================

echo.
set /p pathType=Please choose a output format : 

echo.
set /p filter=filter specific file type ? (y/n) 

if %filter%==y (
	echo.
	set /p inExt=please type the extension of file : 
	set ext=*.!inExt!
) else (
	set ext=*
)

echo.
echo It is reading files, Please wait a moment...

cd.>%out%

if %pathType%==1 (
	for /r %%i in (%ext%) do (
		echo %%~fi>>%out%
	)
) else (
	if %pathType%==2 (
		for /r %%i in (%ext%) do (
			set path=%%~fi
			echo !path:%~dp0=.\!>>%out%
		)
	) else (
		if %pathType%==3 (
			for /r %%i in (%ext%) do (
				echo %%~nxi>>%out%
			)
		)
	)
)

echo.
echo Read Completed
echo.

pause & exit