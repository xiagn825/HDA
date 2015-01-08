@echo off

cls

echo Program is running ...

cd.>.\scriptFiles.sql

for /r .\ddl %%i in (*) do (
	echo @@./ddl/%%~nxi;>>.\scriptFiles.sql
)

for /r .\dml %%i in (*) do (
	echo @@./dml/%%~nxi;>>.\scriptFiles.sql
)

echo exit;>>.\scriptFiles.sql

echo.
echo sql script is created

set nls_lang=AMERICAN_AMERICA.AL32UTF8

sqlplus HDADMIN/HDADMINPW@XE @.\scriptFiles.sql>.\history.log

echo.
echo Completed

echo.
pause & exit