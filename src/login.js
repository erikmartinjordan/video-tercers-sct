const { ipcRenderer } = require('electron')
import config          from './src/config.js';
import cameres         from './src/cameres.js';

const Login = () => {
    
    const [auth, setAuth]     = React.useState('login');
    const [entity, setEntity] = React.useState('SCT');
    const [error, setError]   = React.useState(null);
    const [output, setOutput] = React.useState(-1); 
    const [user, setUser]     = React.useState(null);
    const [pass, setPass]     = React.useState(null);
    const [vlc, setVlc]       = React.useState(null);
    
    React.useEffect(() => {
        
        if(output >= 0){
            
            placeCams();
            window.addEventListener('beforeunload', () => disconnectCamera(user, pass, output));
            
        }
        
    }, [output]);
    
    const connectCamera = async (user, pass, address, port, camera) => {
        
        let url = `http://${address}:${port}/set?operation=connect&output=${output + 1}&camera=camera.${camera}`;
        
        let res = await fetch(url, {headers: {'Authorization': 'Basic ' +  btoa(entity + ":" + pass) }}); 
        
        if(res.ok){
            
            setVlc('loading');
            
            setTimeout(async () => {
                
                let { rtsp_ports } = config[entity];

                let current_rtsp = Object.keys(rtsp_ports)[output];
                
                let rtsp = `rtsp://${address}:${current_rtsp}/output${output + 1}.sdp`;
                
                await ipcRenderer.invoke('launchVLC', rtsp);
                
                setVlc('launched');
                
            }, 3000);
            
        }
        
    }
    
    const disconnectCamera = async (user, pass, output) => {
        
        let { address, port } = config[user];
        
        let url= `http://${address}:${port}/set?operation=disconnect&output=${output + 1}`;

        let res = await fetch(url, {headers: {'Authorization': 'Basic ' +  btoa(user + ":" + pass) }});
        
        if(res.ok){
            
            console.log('Càmera desconnectada');
            
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
                
                let { address, port } = config[entity];
                
                connectCamera(user, pass, address, port, id);
                
            });
            
        });
        
    }
    
    const validateUser = async (e) => {
        
        e.preventDefault();
        
        let { address, port, rtsp_ports } = config[entity];
        
        let url = `http://${address}:${port}/set?operation=status`;
        
        let res = await fetch(url, {headers: {'Authorization': 'Basic ' +  btoa(entity + ":" + pass) }});
        
        let output = Object.values(rtsp_ports).findIndex(ports => ports.name === user);
        
        if(res.ok && output > -1){
            
            setAuth('done');
            setOutput(output);
            
        }
        else{
            
            setError('Les credencials són incorrectes');
            
        }
        
    }

    return(
        <React.Fragment>
            { auth === 'login'
            ? <div className = 'Login'>
                <div className = 'Login-Wrapper'>
                    <img src = {'./assets/sct_logo.png'}></img>
                    <p>Si us plau, selecciona la teva entitat, i accedeix amb el teu usuari i contrasenya:</p>
                    <form onSubmit = {validateUser}>
                        <select value = {entity} onChange = {(e) => setEntity(e.target.value)}>
                            {Object.keys(config).map((entity, key) => <option key = {key}>{entity}</option>)}
                        </select>
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