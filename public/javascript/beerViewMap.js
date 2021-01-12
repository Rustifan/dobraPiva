

mapboxgl.accessToken = mapToken;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: beerCoords, // starting position [lng, lat]
    zoom: 6 // starting zoom
   
});


var el = document.createElement('div');
el.className = 'marker';
el.style.width = "35px";
el.style.height = "35px";
el.style.borderRadius = "0px";



var marker = new mapboxgl.Marker(el)
.setLngLat(beerCoords)
.addTo(map);


