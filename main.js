const { app, BrowserWindow, dialog } = require('electron');
const { spawn }                      = require('child_process');

require('electron-reload')();

function createWindow () {
    
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
    });

    win.loadFile('index.html');
    
}

function activateCamera (num_camera) {
    
    
}

function deactivateCamera (num_camera) {
    
    
    
}

function launchVLC (rtsp_link) {
    
    const path = 'C:\\Program Files\\VideoLAN\\VLC\\vls.exe';
     
    const proc = spawn(`"${path}"`, [`http://46.16.226.181:88/?action=stream`], { shell: true });

    proc.stdout.on('data', function (data) {
        
        const options = {
            
            'title': 'Advertència',
            'message': 'Si us plau, instal·la VLC al teu ordinador'
            
        }
        
        console.log(dialog.showMessageBox(null, options));
        
    });

}

app.whenReady().then(createWindow).then(launchVLC);

app.on('window-all-closed', () => {
    
    if (process.platform !== 'darwin') {
        app.quit();
    }
    
});

app.on('activate', () => {
    
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
    
});