const { ipcRenderer } = require('electron')
import config          from './src/config.js';
import cameres         from './src/cameres.js';

const Login = () => {
    
    const [auth, setAuth]    = React.useState(false);
    const [error, setError]  = React.useState(null);
    const [user, setUser]    = React.useState(null);
    const [pass, setPass]    = React.useState(null);
    const [vlc, setVlc]      = React.useState(null);
    
    const connectCamera = async (user, pass, address, port, camera) => {
        
        let url = `http://${address}:${port}/set?operation=connect&output=1&camera=camera.${camera}`;
        
        let res = await fetch(url, {headers: {'Authorization': 'Basic ' +  btoa(user + ":" + pass) }}); 
        
        if(res.ok){
            
            setVlc('loading');
            
            setTimeout(async () => {
                
                let { rtsp_ports } = config[user];
            
                let rtsp = `rtsp://${address}:${rtsp_ports[0]}/output1.sdp`;

                await ipcRenderer.invoke('launchVLC', rtsp);
                
                setVlc('launched');
                
            }, 3000);
            
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
    
    const validate = async (e) => {
        
        e.preventDefault();
        
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
                    <form onSubmit = {validate}>
                        <input onChange = {(e) => setUser(e.target.value)} placeholder = 'Usuari'></input>
                        <input onChange = {(e) => setPass(e.target.value)} placeholder = 'Contrasenya' type = 'password'></input>
                        <button type = 'submit'>Accedeix</button>
                    </form>
                    <span className = 'Error'>{error}</span>
                </div>
              </div>
            : null                
            }
            { vlc === 'loading'
            ? <div className = 'Loader'>
                <div className = 'Loader-Wrapper'>
                    <p>Carregant vídeo...</p>
                    <div className = 'Circle'></div>
                </div>
              </div>
            : null
            }
        </React.Fragment>
    );
    
}

ReactDOM.render(<Login />, document.getElementById('login'));