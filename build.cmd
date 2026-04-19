REM Sanatan AI powered script
@echo off
cls
color 09
echo ## Sanatan AI Builder ##
echo Write 'x' in commit message to skip commit.
set /p commitMsg=Please enter a commit message: 
if "%commitMsg%"=="" (
    cmd /c "cd other && node ./update.cjs"
    git add .
    git commit -m "Update Sanatan AI"
) else if "%commitMsg%" == "x" (
    echo Skipping commit.
) else (
    cmd /c "cd other && node ./update.cjs"
    git add .
    git commit -m "%commitMsg%"
)
set /p buildOrDev=Do you want to build the app or run the dev script? (vercel/build/dev/none):
if "%buildOrDev%"=="vercel" (
    echo deploying to vercel..
    cmd /c "cd other && node ./main.cjs"
    cmd /c vercel --prod
    cmd /c "cd other && node ./main.cjs"
) else if "%buildOrDev%"=="build" (
    echo Building the app...
    npm run publish
) else if "%buildOrDev%"=="dev" (
    echo Running the dev script...
    npm run dev
) else if "%buildOrDev%"=="none" (
    echo Skipping build and dev scripts.
 ) else (
    echo Invalid option.
    echo Skipping by default..
)
if "%errorLevel%" == "0" (
    exit 0
) else (
    echo Error Occured
    pause
    exit 0
)