const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const { spawn }                               = require('child_process');

require('electron-reload')(__dirname);

function createWindow () {
    
    const win = new BrowserWindow({
        
        width: 800,
        height: 600,
        icon: __dirname + '/assets/camera_icon.png',
        title: 'Aplicació de vídeo a tercers del Servei Català del Trànsit',
        webPreferences: {
            
          nodeIntegration: true
            
        }
        
    });

    win.loadFile('index.html');
    
    win.setMenuBarVisibility(false);
    
}

ipcMain.handle('launchVLC', async (e, rtsp) => {
    
    const path = 'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe';
     
    const proc = spawn(`"${path}"`, [`${rtsp}`], { shell: true });

    proc.stdout.on('data', function (data) {
        
        const options = {
            
            'title': 'Advertència',
            'message': 'Si us plau, instal·la VLC al teu ordinador'
            
        }
        
        console.log(dialog.showMessageBox(null, options));
        
    });

});

app.whenReady().then(createWindow);

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