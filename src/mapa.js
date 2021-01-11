// Agafar la referència del mapa de Catalunya
var element = document.getElementById('mapa-catalunya');

// Afegir Leaflet al mapa
var mapa = L.map(element);

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
mapa.setView(marcador, 25);

// Afegim el marcador al mapa i obrir finestra al fer clic
L.marker(marcador).addTo(mapa).bindPopup("SCT, Diputació 355").openPopup();