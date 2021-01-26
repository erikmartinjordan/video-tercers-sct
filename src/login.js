const { ipcRenderer } = require('electron')
import config          from './src/config.js';
import cameres         from './src/cameres.js';

const Login = () => {
    
    const [auth, setAuth]     = React.useState('login');
    const [error, setError]   = React.useState(null);
    const [output, setOutput] = React.useState(-1); 
    const [user, setUser]     = React.useState(null);
    const [pass, setPass]     = React.useState(null);
    const [vlc, setVlc]       = React.useState(null);
    
    React.useEffect(() => {
        
        if(output >= 0)
            window.addEventListener('beforeunload', () => disconnectCamera(user, pass, output));
        
    }, [output]);
    
    const connectCamera = async (user, pass, address, port, camera) => {
        
        let url = `http://${address}:${port}/set?operation=connect&output=${output + 1}&camera=camera.${camera}`;
        
        let res = await fetch(url, {headers: {'Authorization': 'Basic ' +  btoa(user + ":" + pass) }}); 
        
        if(res.ok){
            
            setVlc('loading');
            
            setTimeout(async () => {
                
                let { rtsp_ports } = config[user];

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
                
                let { address, port } = config[user];
                
                connectCamera(user, pass, address, port, id);
                
            });
            
        });
        
    }
    
    const validateUser = async (e) => {
        
        e.preventDefault();
        
        let { address, port } = config[user];
        
        let url = `http://${address}:${port}/set?operation=status`;
        
        let res = await fetch(url, {headers: {'Authorization': 'Basic ' +  btoa(user + ":" + pass) }});
        
        if(res.ok){
            
            setAuth('user');
            
        }
        else{
            
            setError('Usuari o contrasenya incorrecte');
            
        }
        
    }
    
    const displayMap = () => {
        
        placeCams();
        setAuth('done');        
        
    }

    return(
        <React.Fragment>
            { auth === 'login'
            ? <div className = 'Login'>
                <div className = 'Login-Wrapper'>
                    <img src = {'./assets/sct_logo.png'}></img>
                    <p>Si us plau, identifíca't per poder utilitzar l'aplicació de vídeo a tercers del Servei Català del Trànsit:</p>
                    <form onSubmit = {validateUser}>
                        <input onChange = {(e) => setUser(e.target.value)} placeholder = 'Usuari'></input>
                        <input onChange = {(e) => setPass(e.target.value)} placeholder = 'Contrasenya' type = 'password'></input>
                        <button type = 'submit'>Accedeix</button>
                    </form>
                    <span className = 'Error'>{error}</span>
                </div>
              </div>
            : auth === 'user'
            ? <div className = 'User'> 
                    <div className = 'User-Wrapper'>
                        <p>Abans de començar, selecciona el teu perfil d'usuari:</p>
                        {Object.values(config[user].rtsp_ports).map((member, index) => 
                            <div className = {output === index ? 'User-Pic Selected' : 'User-Pic'} onClick = {() => setOutput(index)} key = {index}>
                                <img src = {member.pic}></img>
                                <span>{member.name}</span>
                            </div>
                        )}
                        {output >= 0 ? <button onClick = {displayMap}>Comença</button> : null}
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