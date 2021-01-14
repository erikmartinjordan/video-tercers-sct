const Login = () => {
    
    const [user, setUser] = React.useState(null);
    const [pass, setPass] = React.useState(null);

    return(
        <React.Fragment>
            <div className = 'Login'>
                <div className = 'Login-Wrapper'>
                    <img src = {'./assets/sct_logo.png'}></img>
                    <p>Si us plau, identifíca't per poder utilitzar l'aplicació de vídeo a tercers del Servei Català del Trànsit:</p>
                    <input onChange = {(e) => setUser(e.target.value)} placeholder = 'Usuari'></input>
                    <input onChange = {(e) => setPass(e.target.value)} placeholder = 'Contrasenya'></input>
                    <button>Login</button>
                </div>
            </div>
        </React.Fragment>
    );
    
}

ReactDOM.render(<Login />, document.getElementById('login'));