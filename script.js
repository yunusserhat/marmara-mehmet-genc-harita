// Harita nesnesini oluştur (varsayılan bir başlangıç noktası verildi)
const map = L.map('map', { minZoom: 16, maxZoom: 20 });

// OpenStreetMap katmanını ekle
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Kampüs GeoJSON verisini yükle
fetch('kampus.geojson')
  .then(response => response.json())
  .then(data => {
    const kampusLayer = L.geoJSON(data, {
        style: {
            color: 'blue',
            weight: 2,
            fillOpacity: 0.1
        }
    }).addTo(map);

    map.fitBounds(kampusLayer.getBounds());
    map.setMaxBounds(kampusLayer.getBounds().pad(1.5));
  })
  .catch(error => console.log('GeoJSON yüklenirken hata oluştu:', error));

// 👇 Harita yüklemesi bittikten sonra boyutu yeniden kontrol et
window.addEventListener('load', () => {
    setTimeout(() => {
        map.invalidateSize();
    }, 500);
});
