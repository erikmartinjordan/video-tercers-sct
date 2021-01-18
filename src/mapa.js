import cameres from './src/cameres.js';

// Agafar la referència del mapa de Catalunya
var element = document.getElementById('mapa-catalunya');

// Afegir Leaflet al mapa
window.mapa = L.map(element, {zoomControl: false});

// Afegir control de zoom a la part dreta inferior de la pàgina
L.control.zoom({position: 'bottomright'}).addTo(mapa);

// Afegir capes (tiles) OSM
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mapa);

// Referència central del mapa 
var marcador = L.latLng('41.39576618797968', '2.173775823753265');

// Seleccionem el marcador amb zoom de 25
mapa.setView(marcador, 10);
