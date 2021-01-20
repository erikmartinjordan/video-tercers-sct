import cameres from './src/cameres.js';

const Search = () => {
    
    const [numero, setNumero] = React.useState('');

    const centerMap = (id) => {
        
        var lat = cameres[id].coordenades.lat;
        var lng = cameres[id].coordenades.lng;
        
        var marcador = L.latLng(lat, lng);

        mapa.setView(marcador, 25);
        
        setNumero('');
        
    }
    
    return(
        <div className = 'Cerca'>
            <input placeholder = 'Introdueix el número de càmera...' onChange = {(e) => setNumero(e.target.value)} value = {numero}></input>
            { numero
            ? <div className = 'Llistat'>
                {Object.keys(cameres).filter(camera => camera.startsWith(numero)).map((id, key) => 
                    <li key = {key} onClick = {() => centerMap(id)}>
                        <div className = 'Carretera-Pk'>
                            <span className = 'Carretera'>📍 {cameres[id].carretera}</span>
                            <span className = 'Pk'>(Pk {cameres[id].pk})</span>
                        </div>
                        <div className = 'Camera'>{id}</div>                                                                 
                    </li>
                )}
              </div>
            : null
            }
        </div>
    );
    
}

ReactDOM.render(<Search/>, document.getElementById('cerca'));