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

    // GeoJSON katmanının sınırlarını al ve haritayı buraya sınırla
    map.fitBounds(kampusLayer.getBounds());
    map.setMaxBounds(kampusLayer.getBounds());

    // Kampüs sınırları dışına çıkışı engellemek için maxBoundsViscosity kullan (haritayı geri ittirir)
    map.setMaxBounds(kampusLayer.getBounds().pad(0.1));

    // İstersen pop-up ekle
    kampusLayer.bindPopup('Marmara Üniversitesi Mehmet Genç Külliyesi').openPopup();
})
.catch(error => console.log('GeoJSON yüklenirken hata oluştu:', error));
