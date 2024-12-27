var map = new maplibregl.Map({
  container: 'map',
  style: 'https://sgx.geodatenzentrum.de/gdz_basemapworld_vektor/styles/bm_web_wld_col.json',
  center: [10, 51],
  zoom: 6,
});

const addressInput = document.getElementById('addressInput');
const searchResults = document.getElementById('searchResults');
let marker = null;
let resultsVisible = false;


async function geocodeAddress(address) {
const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}`;
  try {
      const response = await fetch(photonUrl);
      const data = await response.json();

      if (data && data.features && data.features.length > 0) {
        const result = data.features[0];
        const coords = result.geometry.coordinates;
        updateMapAndMarker(coords);
          clearSearchResults();

      } else {
          alert('No results found for this address.');
      }
  } catch (error) {
      console.error('Error during geocoding', error);
      alert('Error during geocoding.');
  }
}

function updateMapAndMarker(coords) {
map.flyTo({
    center: coords,
    zoom: 15,
});

if (marker) {
    marker.remove();
}

marker = new maplibregl.Marker()
    .setLngLat(coords)
    .addTo(map);
}

async function fetchSuggestions(address) {
if (!address) {
  clearSearchResults();
  return;
}

const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=5`;
  try {
      const response = await fetch(photonUrl);
      const data = await response.json();
      displaySuggestions(data.features);
  } catch (error) {
      console.error('Error fetching suggestions', error);
  }
}

function displaySuggestions(results) {
clearSearchResults();

if (!results || results.length === 0) {
      resultsVisible = false;
      searchResults.style.display = 'none';
    return;
}

results.forEach(result => {
  const props = result.properties;
  let addressParts = [];

      if (props.name) {
          addressParts.push(props.name);
      }
      if (props.street) {
          addressParts.push(props.street);
      }
      if (props.housenumber) {
           addressParts.push(props.housenumber)
      }

       if(props.postcode && props.city) {
           addressParts.push(props.postcode + ' ' + props.city )
       }

      const addressString = addressParts.join(', ');

  const listItem = document.createElement('li');
      listItem.textContent = addressString;

  listItem.addEventListener('click', () => {
      const coords = result.geometry.coordinates;
      addressInput.value = listItem.textContent;
      updateMapAndMarker(coords);
      clearSearchResults();
  });

  searchResults.appendChild(listItem);
});
  resultsVisible = true;
  searchResults.style.display = 'block';
}

function clearSearchResults() {
searchResults.innerHTML = '';
searchResults.style.display = 'none';
resultsVisible = false;
}


addressInput.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      if (searchResults.children.length > 0 ) {
         const firstResult = searchResults.children[0];
          firstResult.click();
        } else {
          const address = addressInput.value;
          if (address) {
            geocodeAddress(address);
          } else {
              alert('Please enter an address.');
         }
      }
   }
});

addressInput.addEventListener('input', () => {
  const address = addressInput.value;
  fetchSuggestions(address);
});


addressInput.addEventListener('focus', () => {
if (resultsVisible === false && addressInput.value) {
     fetchSuggestions(addressInput.value)
} else if (resultsVisible === false) {
  clearSearchResults()
}
});


// Event listener to close search results on map click
map.on('click', () => {
  clearSearchResults();
});