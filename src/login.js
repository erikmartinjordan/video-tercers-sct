const { ipcRenderer } = require('electron')
import config          from './src/config.js';
import cameres         from './src/cameres.js';

const Login = () => {
    
    const [auth, setAuth]     = React.useState(false);
    const [error, setError]   = React.useState(null);
    const [user, setUser]     = React.useState(null);
    const [pass, setPass]     = React.useState(null);
    const [output, setOutput] = React.useState(1);
    
    const connectCamera = async (user, pass, address, port, camera) => {
        
        let url = `http://${address}:${port}/set?operation=connect&output=${output}&camera=camera.${camera}`;
        
        let res = await fetch(url, {headers: {'Authorization': 'Basic ' +  btoa(user + ":" + pass) }}); 
        
        if(res.ok){
            
            let { rtsp_ports } = config[user];
            
            let rtsp = `rtsp://${address}:${rtsp_ports[output - 1]}/output${output}.sdp`;
            
            await ipcRenderer.invoke('launchVLC', rtsp);
            
            setOutput(output => (output + 1) % rtsp_ports.length);
            
        }
        
    }
    
    const placeCams = () => {
                
        Object.entries(cameres).forEach(([id, camera]) => {

            var cameraIcon = L.divIcon({

                html: `<div class = 'Icon'>
                            <img src = './assets/camera_icon.png'/>
                            <div class = 'Number'>${id}</div>
                       </div>`
                
            });

            L.marker([camera.coordenades.lat, camera.coordenades.lng], {icon: cameraIcon}).addTo(mapa).on('click', async () => {
                
                let { address, port } = config[user];
                
                connectCamera(user, pass, address, port, id);
                
            });

        });
        
    }
    
    const validate = async () => {
        
        let { address, port } = config[user];
        
        let url = `http://${address}:${port}/set?operation=status`;
        
        let res = await fetch(url, {headers: {'Authorization': 'Basic ' +  btoa(user + ":" + pass) }});
        
        if(res.ok){
            
            setAuth(true);
            placeCams();
            
        }
        else{
            
            setError('Usuari o contrasenya incorrecte');
            
        }
        
    }

    return(
        <React.Fragment>
            { !auth
            ? <div className = 'Login'>
                <div className = 'Login-Wrapper'>
                    <img src = {'./assets/sct_logo.png'}></img>
                    <p>Si us plau, identifíca't per poder utilitzar l'aplicació de vídeo a tercers del Servei Català del Trànsit:</p>
                    <input onChange = {(e) => setUser(e.target.value)} placeholder = 'Usuari'></input>
                    <input onChange = {(e) => setPass(e.target.value)} placeholder = 'Contrasenya' type = 'password'></input>
                    <button onClick = {validate}>Accedeix</button>
                    <span className = 'Error'>{error}</span>
                </div>
              </div>
            : null                
            }
        </React.Fragment>
    );
    
}

ReactDOM.render(<Login />, document.getElementById('login'));