const { app, BrowserWindow } = require('electron');
const ffmpeg                 = require('fluent-ffmpeg');
const ffmpegPath             = require('ffmpeg-static').replace('app.asar', 'app.asar.unpacked');

require('electron-reload')();

ffmpeg.setFfmpegPath(ffmpegPath);

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

function testStream () {
    
   

    
}

app.whenReady().then(createWindow).then(testStream);

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