@echo off
echo 1. Definition du chemin d'acces au compresseur IZArc
set directory=C:\Program Files\IZArc\
set executable=IZARCC.exe

echo 2. Suppression des anciens fichiers
del dev.xpi 1>nul 2>nul
del dev.zip 1>nul 2>nul
del chrome\xmystats.jar 1>nul 2>nul

echo 3. Compression du .jar
"%directory%/%executable%" -a -r -p "%CD%\chrome\xmystats.jar" "%CD%\chrome\" 1>nul

echo 4. Compression du .zip
"%directory%/%executable%" -a -r -p "%CD%\dev.zip" "%CD%\*.jar" "%CD%\install.rdf" 1>nul

echo 5. Formation du .xpi
rename dev.zip dev.xpi 1>nul

echo 6. Suppression du .jar
del chrome\xmystats.jar 1>nul