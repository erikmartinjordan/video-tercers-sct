import cameres from './src/cameres.js';

const Search = () => {
    
    const [query, setQuery] = React.useState('');

    const centerMap = (id) => {
        
        var lat = cameres[id].coordenades.lat;
        var lng = cameres[id].coordenades.lng;
        
        var marcador = L.latLng(lat, lng);

        mapa.setView(marcador, 25);
        
        setQuery('');
        
    }
    
    const getCameraByNumberOrRoad = (id) => {

        let Query = query.toUpperCase();
        
        // Filter camera by number
        if(id.startsWith(Query)) 
            return true;
        
        // Filter camera by road
        if(cameres[id].carretera.startsWith(Query) || cameres[id].carretera.replace(/-/g, '').startsWith(Query))
            return true;
        
    }
    
    return(
        <div className = 'Cerca'>
            <input placeholder = 'Introdueix el número de càmera o la carretera...' onChange = {(e) => setQuery(e.target.value)} value = {query}/>
            { query
            ? <div className = 'Llistat'>
                {Object.keys(cameres).filter(getCameraByNumberOrRoad).map((id, key) => 
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