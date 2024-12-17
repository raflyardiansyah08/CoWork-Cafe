function initMap() {
  const location = { lat: -7.2575, lng: 112.7521 }; // Koordinat Surabaya
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: location,
  });
  new google.maps.Marker({
    position: location,
    map: map,
  });
}
