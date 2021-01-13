const express = require('express');
Stream        = require('node-rtsp-stream');

let app = express();

let server = app.listen(3000);

app.get('/', function(req, res){
    
    res.send('Hola! El servidor està on');
    
});

app.get('/test', function(req, res){
   
    res.send('Hola! Això és un test');
    
});

app.get('/video', function(req, res){
    
    stream = new Stream({
        
        name: 'name',
        streamUrl: 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
        wsPort: 9000
        
    });
    
    console.log(stream);
   
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
                <script type = "text/javascript" src = "jsmpeg.js"></script>
                <script type = "text/javascript">
                    var client = new WebSocket( 'ws://localhost:9000/' );
                    var canvas = document.getElementById('video');
                    var player = new jsmpeg(client, {canvas: canvas});
                </script>
            </body>
            </html>`
    );
    
});