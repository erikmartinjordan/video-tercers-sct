import cameres from './src/cameres.js';

var element = document.getElementById('mapa-catalunya');

var mapboxURL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var streets   = L.tileLayer(mapboxURL, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: 'Mapbox'});
var ortophoto = L.tileLayer(mapboxURL, {id: 'mapbox/satellite-streets-v11', tileSize: 512, zoomOffset: -1, attribution: 'Mapbox'});

window.mapa = L.map(element, {
    zoomControl: false,
    layers: [streets, ortophoto]
});

var baseMaps = {
    "Ortophoto": ortophoto,
    "Streets": streets
}

L.control.layers(baseMaps).addTo(mapa);

L.control.zoom({position: 'bottomright'}).addTo(mapa);

var marcador = L.latLng('41.39576618797968', '2.173775823753265');

mapa.setView(marcador, 13);