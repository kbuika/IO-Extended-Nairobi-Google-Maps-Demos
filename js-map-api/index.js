let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -1.30320, lng: 36.707 },
    zoom: 16,
    mapId: "", // generate a Map ID (Optional)
    tilt: 40,
  });
}

window.initMap = initMap;