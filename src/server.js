const express     = require('express');
const ffmpegPath  = require('ffmpeg-static');
Stream            = require('node-rtsp-stream');

let app = express();

let server = app.listen(3000);

// Es crea un servidor que escolta el port 3000
// S'envia un flux de streaming per al port 9000
// Per executar aquesta funció -> https://localhost:3000
app.get('/video', function(req, res){
    
    stream = new Stream({
        
        name: 'name',
        streamUrl: 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
        wsPort: 9000,
        ffmpegPath: ffmpegPath
        
    });
   
    res.send(
        `<!DOCTYPE html>
            <html>
            <head>
                <meta name = "viewport" content = "width=640, initial-scale=1"/>
                <style type = "text/css">
                    html, body {
                        width: 800px;
                        height: 600px;
                        margin: 0;
                    }
                    canvas {
                        margin: 0;
                    }
                </style>
            </head>
            <body>
                <canvas id = "video"></canvas>
                <script src = "https://cdnjs.cloudflare.com/ajax/libs/jsmpeg/0.2/jsmpg.js"></script>
                <script>
                    var client = new WebSocket( 'ws://localhost:9000/' );
                    var canvas = document.getElementById('video');
                    var player = new jsmpeg(client, {canvas: canvas});
                </script>
            </body>
            </html>`
    );
    
});