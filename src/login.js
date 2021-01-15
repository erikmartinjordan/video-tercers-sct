import config from './src/config.js';

const Login = () => {
    
    const [auth, setAuth] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [pass, setPass] = React.useState(null);
    
    const validate = async () => {
        
        let { address, port } = config[user];
        
        console.log(address, port);
        
        /*let res = await fetch(`http://${user}:${password}@${address}:${port}/set?operation=status`);
        
        if(res.ok){
            
            setAuth(true);
            
        }*/
        
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