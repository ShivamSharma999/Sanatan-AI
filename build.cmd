REM Sanatan AI powered script
@echo off
cls
color 09
echo ## Sanatan AI Builder ##
cmd /c "cd other && node ./update.js"
git add .
echo Write 'x' in commit message to skip commit.
set /p commitMsg=Please enter a commit message: 
if "%commitMsg%"=="" (
    git commit -m "Update Sanatan AI"
) else if "%commitMsg%" == "x" (
    echo Skipping commit.
) else (
    git commit -m "%commitMsg%"
)
set /p buildOrDev=Do you want to build the app or run the dev script? (build/dev/none):
if "%buildOrDev%"=="build" (
    echo deploying to vercel..
    cmd /c "cd other && node ./main.js"
    cmd /c vercel --prod
    cmd /c "cd other && node ./main.js"
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
exit 0