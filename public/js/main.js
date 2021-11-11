$(function () {
  initMap();
});

function initMap() {
  let map;
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.36, lng: -71.0589 },
    zoom: 12,
  });
}

function validateForm(city, food) {
  if (city === "" || food === "") {
    return false;
  }
  return true;
}

function placeMarkers(city, food) {
  fetch(`http://localhost:3000/yelp/${city}/${food}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
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
  placeMarkers(cityLocation, foodType);
});
