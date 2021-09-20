/* eslint-disable */
console.log('hello from the client side');

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWJkdWxsYWgtYWxoYXJpcmkiLCJhIjoiY2t0c2s5c3o2MDdtZzJwb2RzYXVrNWh2OSJ9.lkR3rQJ5w8_-HHEpQTL75w';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/abdullah-alhariri/cktskd8zx57yu18pbi6frlo7a',
  zoom: 2
});
const bounds = new mapboxgl.LngLatBounds(); // 'mapboxgl.LatLngBounds' comes from block append head scripts

locations.forEach(loc => {
  // create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100
  }
});
