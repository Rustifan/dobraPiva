

alert("asdsd");
mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmNhY2UiLCJhIjoiY2tqc2MyZThvMHc5aDJxcWhsem5oZ21hdiJ9.6C_WHI6ARt49GWMzJZzYeQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});