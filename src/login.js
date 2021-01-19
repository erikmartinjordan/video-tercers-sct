const { ipcRenderer } = require('electron')
import config          from './src/config.js';
import cameres         from './src/cameres.js';

const Login = () => {
    
    const [auth, setAuth] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [pass, setPass] = React.useState(null);
    
    const placeCams = () => {
                
        Object.values(cameres).forEach(camera => {

            var cameraIcon = L.icon({
                
                iconUrl: './assets/camera_icon.png',
                iconSize: [55, 55],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76]
                
            });

            L.marker([camera.coordenades.lat, camera.coordenades.lng], {icon: cameraIcon}).addTo(mapa).on('click', async () => {
                
                let rtsp = `http://46.16.226.181:88/?action=stream`; 
                
                // let { address, port } = config[user];
                // let sct_rtsp = `rtsp://${address}:9001/output1.sdp`;
                // Aquí he de fer la petició de connexió de la càmera -> connectCamera(user, pass, addr, port, camera)
                // Aquí de invocar a VLC per poder reproduir les imatges -> openVLC(rtsp)
                
                await ipcRenderer.invoke('launchVLC', rtsp);
                
            });

        });
        
    }
    
    const validate = async () => {
        
        let { address, port } = config[user];
        
        /*let res = await fetch(`http://${user}:${password}@${address}:${port}/set?operation=status`);
        
        if(res.ok){
            
            setAuth(true);
            
        }*/        
        
        setAuth(true);
        placeCams();
        
    }

    return(
        <React.Fragment>
            { !auth
            ? <div className = 'Login'>
                <div className = 'Login-Wrapper'>
                    <img src = {'./assets/sct_logo.png'}></img>
                    <p>Si us plau, identifíca't per poder utilitzar l'aplicació de vídeo a tercers del Servei Català del Trànsit:</p>
                    <input onChange = {(e) => setUser(e.target.value)} placeholder = 'Usuari'></input>
                    <input onChange = {(e) => setPass(e.target.value)} placeholder = 'Contrasenya'></input>
                    <button onClick = {validate}>Accedeix</button>
                </div>
              </div>
            : null                
            }
        </React.Fragment>
    );
    
}

ReactDOM.render(<Login />, document.getElementById('login'));