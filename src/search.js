import cameres from './src/cameres.js';

const Search = () => {
    
    const [numero, setNumero] = React.useState(null);

    return(
        <div className = 'Cerca'>
            <input placeholder = 'Introdueix el número de càmera...' onChange = {(e) => setNumero(e.target.value)}></input>
            { numero
            ? <div className = 'Llistat'>
                {Object.keys(cameres).filter(camera => camera.startsWith(numero)).map((numero, key) => 
                    <li key = {key}>
                        <div className = 'Carretera'>📍 {cameres[numero].carretera}</div>
                        <div className = 'Pk'>(Pk {cameres[numero].pk})</div>
                    </li>
                )}
              </div>
            : null
            }
        </div>
    );
    
}

ReactDOM.render(<Search/>, document.getElementById('cerca'));