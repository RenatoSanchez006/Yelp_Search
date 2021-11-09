let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.360, lng: -71.0589 },
    zoom: 12,
  });
}

initMap();