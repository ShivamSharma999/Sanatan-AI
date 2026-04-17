const { BrowserWindow, app, Menu } = require('electron');
const path = require('path');
const { autoUpdater } = require("electron-updater");
const http = require('http');
const url = require('url');

let mainWindow = null;
let authServer = null;
let authServerPort = 5612;

function startAuthServer() {
    return new Promise((resolve) => {
        authServer = http.createServer((req, res) => {
            const parsedUrl = new url.URL(req.url, `http://localhost:${authServerPort}`);
            
            // Handle OAuth callback: /auth?code=...&state=...
            if (parsedUrl.pathname === '/auth') {
                const code = parsedUrl.searchParams.get('code');
                const state = parsedUrl.searchParams.get('state');
                const error = parsedUrl.searchParams.get('error');
                const errorDescription = parsedUrl.searchParams.get('error_description');
                
                // Send success response to browser
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                if (code) {
                    res.end(`
                        <!DOCTYPE html>
                        <html>
                        <head><title>Authentication Successful</title></head>
                        <body style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial; background: #f5f5f5;">
                            <div style="text-align: center; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                <h1 style="color: #4CAF50; margin-bottom: 10px;">✓ Authentication Successful</h1>
                                <p style="color: #666;">You can now close this window and return to the app.</p>
                            </div>
                        </body>
                        </html>
                    `);
                } else {
                    res.end(`
                        <!DOCTYPE html>
                        <html>
                        <head><title>Authentication Failed</title></head>
                        <body style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial; background: #f5f5f5;">
                            <div style="text-align: center; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                <h1 style="color: #f44336; margin-bottom: 10px;">✗ Authentication Failed</h1>
                                <p style="color: #666;">${errorDescription || error || 'An error occurred'}</p>
                                <p style="color: #999;">You can close this window.</p>
                            </div>
                        </body>
                        </html>
                    `);
                }
                
                // Send code to main window
                if (mainWindow) {
                    if (code) {
                        mainWindow.webContents.send('oauth-code', { code, state });
                    } else if (error) {
                        mainWindow.webContents.send('oauth-error', { error, errorDescription });
                    }
                }
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        });
        
        authServer.listen(authServerPort, 'localhost', () => {
            console.log(`Auth server listening on http://localhost:${authServerPort}`);
            resolve(authServerPort);
        });
        
        authServer.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                authServerPort++;
                authServer.close();
                startAuthServer().then(resolve);
            }
        });
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(process.cwd(), './favicon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: false,
        }
    });
    mainWindow.loadFile('index.html');

    Menu.setApplicationMenu(null);
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.checkForUpdates();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(async () => {
    await startAuthServer();
    createWindow();
});

app.on('quit', () => {
    if (authServer) {
        authServer.close();
    }
});
