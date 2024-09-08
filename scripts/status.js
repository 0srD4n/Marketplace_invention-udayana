const randomMap = [
  {
    lat: -6.1752453,
    lng: 106.8248764,
  },
  {
    lat: -5.1752453,
    lng: 107.8248764,
  },
  {
    lat: -7.1752453,
    lng: 105.8248764,
  },
];

function initMap(mapData) {
  const map = document.getElementById("map");

  // Membuat peta secara acak dari data map
  const randomIndex = Math.floor(Math.random() * randomMap.length);
  const lat = randomMap[randomIndex].lat;
  const lng = randomMap[randomIndex].lng;

  map.innerHTML = `
      <div class="map" onclick="$(this).toggleClass('.active');">
        <img src="assets/maps.png" alt="Peta Pengiriman" />
      </div>
    `;

  // Mengubah posisi peta ke lokasi acak
  map.style.top = `${lat}px`;
  map.style.left = `${lng}px`;
}

initMap(randomMap);
