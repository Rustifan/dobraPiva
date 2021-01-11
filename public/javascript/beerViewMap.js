

mapboxgl.accessToken = mapToken;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: beerCoords, // starting position [lng, lat]
    zoom: 9 // starting zoom
   
});

var marker = new mapboxgl.Marker()
.setLngLat(beerCoords)
.addTo(map);