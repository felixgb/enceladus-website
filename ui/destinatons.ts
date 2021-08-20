import * as L from "leaflet";

const map = L.map("mapid", { preferCanvas: true }).setView([51.505, -0.09], 19);
L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    detectRetina: true,
    maxZoom: 21,
    maxNativeZoom: 19,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmVsaXhnYiIsImEiOiJja3NkNW83bzYwbjNvMm9xcXF3YXpjdDQyIn0.ue7QSwwh6AX6U5o__nEt8w'
  }
).addTo(map)

map.on('click', (e) => {
  const x = e as L.LeafletMouseEvent;
  console.log(x.latlng)
});
