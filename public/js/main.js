$(function () {
  initMap();
});

let map;
let markers = [];

function initMap() {
  let coords = { lat: 42.36, lng: -71.0589 }; //Boston coordinates
  map = new google.maps.Map(document.getElementById("map"), {
    center: coords,
    zoom: 11,
  });
}

function clearMarkers() {
  for (const mark of markers) {
    mark.setMap(null);
  }
  markers = [];
}

function centerMap(data) {
  let { latitude, longitude } = data.region.center;
  map.setCenter({ lat: latitude, lng: longitude });
  map.setZoom(11);
}

function placeMarkers(data) {
  clearMarkers();
  centerMap(data);
  let { businesses } = data;
  businesses.forEach((elem) => {
    let { latitude, longitude } = elem.coordinates;
    const marker = new google.maps.Marker({
      position: {
        lat: latitude,
        lng: longitude,
      },
    });
    markers.push(marker);
  });
  for (const mark of markers) {
    mark.setMap(map);
  }
}

function validateForm(city, food) {
  if (city === "" || food === "") {
    return false;
  }
  return true;
}

function searchPlaces(city, food) {
  fetch(`http://localhost:3000/yelp/${city}/${food}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      placeMarkers(data);
    })
    .catch((err) => {
      console.log(err);
      alert("Error");
    });
}

$("#btnSearch").click(function (event) {
  event.preventDefault();
  let cityLocation = $("#cityLocation").val();
  let foodType = $("#foodType").val();
  if (!validateForm(cityLocation, foodType)) {
    alert("Fill all the fields");
    return;
  }
  searchPlaces(cityLocation, foodType);
});
