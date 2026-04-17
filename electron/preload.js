const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getOAuthRedirectUri: () => 'http://localhost:5612/auth',
  onOAuthCode: (callback) => {
    ipcRenderer.on('oauth-code', (event, data) => {
      callback(data);
    });
  },
  
  onOAuthError: (callback) => {
    ipcRenderer.on('oauth-error', (event, data) => {
      callback(data);
    });
  },
  removeOAuthCodeListener: () => {
    ipcRenderer.removeAllListeners('oauth-code');
  },

  removeOAuthErrorListener: () => {
    ipcRenderer.removeAllListeners('oauth-error');
  },
  openExternal: (url) => {
    return shell.openExternal(url);
  },
  isElectron: () => {
    return true;
  }
});
