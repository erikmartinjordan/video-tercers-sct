import config  from './src/config.js';
import cameres from './src/cameres.js';

const Login = () => {
    
    const [auth, setAuth] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [pass, setPass] = React.useState(null);
    
    const placeCams = () => {
        
        console.log(Object.values(cameres));
                
        Object.values(cameres).forEach(camera => {

            var cameraIcon = L.icon({
                iconUrl: './assets/camera_icon.png',
                iconSize: [55, 55],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76]
            });

            L.marker([camera.coordenades.lat, camera.coordenades.lng], {icon: cameraIcon}).addTo(mapa).on('click', () => {
                
                console.log('Test');
                
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