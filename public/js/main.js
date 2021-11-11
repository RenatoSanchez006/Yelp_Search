$(function () {
  initMap();
});

let map;
let markers = [];
let history = $('#listHistory').children().length;

function updateHistory(city, food) {
  if (history < 10) {
    history++;
  } else {
    $("#listHistory").children().last().remove();
  }
  $("#listHistory").prepend(`
    <li class="list-group-item">${city} - ${food}</li>
  `);
}

function initMap() {
  let coords = { lat: 42.36, lng: -71.0589 }; //Boston coordinates
  map = new google.maps.Map(document.getElementById("map"), {
    center: coords,
    zoom: 12,
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
  map.setZoom(12);
}

function displayAddres(location) {
  let { display_address } = location;
  let address = '<p class="p-0 my-1"><strong>Address:</strong></p>';
  for (add of display_address) {
    address += `<p class="p-0 my-1">${add}</p>`;
  }
  return address;
}

function getInfoWindow(elem) {
  return `
  <div id="container" style="width: 300px">
    <div class="row">
      <div class="col-11">
        <h6 class="text-dark">${elem.name}</h6>
      </div>
      <div class="col-6 d-flex justify-content-center">
        <img 
          src="${elem.image_url}" 
          alt="No display Image" 
          style="width: 150px; height:auto"
        >
      </div>
      <div class="col-6">
        ${displayAddres(elem.location)}
        <p class="p-0 mt-2 mb-0"><strong>Phone:</strong></p>
        <p class="p-0 my-1">${elem.phone}</p>
        <p class="p-0 mt-2 mb-0"><strong>Rating:</strong></p>
        <p class="p-0 my-1">${elem.rating}</p>
        <a class="h6 p-0 mt-2" href="${elem.url}">Yelp Link</a>
      </div>
    </div>
  </div>
`;
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
    const contentString = getInfoWindow(elem);
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
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
      updateHistory(city, food);
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
