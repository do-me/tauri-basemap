var map = new maplibregl.Map({
  container: 'map',
  style: 'https://sgx.geodatenzentrum.de/gdz_basemapworld_vektor/styles/bm_web_wld_col.json',
  center: [10, 51],
  zoom: 6,
});

document.getElementById('clearInput').addEventListener('click', function() {
  document.getElementById('addressInput').value = '';
    document.getElementById('searchResults').innerHTML = ''; //Clear the suggestions as well when the input is cleared
});