@echo off
:: Node.js kontrolü
where node >nul 2>&1
if errorlevel 1 (
    echo Node.js bulunamadi! Lutfen https://nodejs.org/ adresinden indirip kurun.
    pause
    exit /b 1
)
echo Node.js bulundu.

:: package.json kontrolü
if not exist package.json (
    echo package.json bulunamadi. Proje klasorunde oldugunuzdan emin olun.
    pause
    exit /b 1
)
echo Paketler yukleniyor...
npm install

:: pm2 yukleme kontrolü
where pm2 >nul 2>&1
if errorlevel 1 (
    echo PM2 bulunamadi. Suan yukleniyor...
    npm install -g pm2
    if errorlevel 1 (
        echo PM2 yukleme basarisiz oldu! Lutfen manuel olarak kurun.
        pause
        exit /b 1
    ) else (
        echo PM2 basariyla yuklendi.
    )
) else (
    echo PM2 zaten yuklu.
)

echo Tum paketler ve PM2 hazir.
pause
