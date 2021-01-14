const { app, BrowserWindow, dialog } = require('electron');
const { spawn }                      = require('child_process');

require('electron-reload')(__dirname);

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

async function connectCamera (user, password, address, port, num_output, num_camera) {
    
    await fetch(`http://${user}:${password}@${address}:${port}/set?operation=connect&output=${num_output}&camera=${num_camera}`);
    
}

async function disconnectCamera (user, password, address, port, num_camera) {
    
    await fecth(`http://${user}:${password}@${address}:${port}/set?opeartion=disconnect&output=${num_camera}`);
    
}

function launchVLC (rtsp_link) {
    
    const path = 'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe';
     
    const proc = spawn(`"${path}"`, [`http://46.16.226.181:88/?action=stream`], { shell: true });

    proc.stdout.on('data', function (data) {
        
        const options = {
            
            'title': 'Advertència',
            'message': 'Si us plau, instal·la VLC al teu ordinador'
            
        }
        
        console.log(dialog.showMessageBox(null, options));
        
    });

}

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