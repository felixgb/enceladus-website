import MB from "mapbox-gl";

interface Coords {
  latitude: number;
  longitude: number;
}

const token = "pk.eyJ1IjoiZmVsaXhnYiIsImEiOiJja3NkNW83bzYwbjNvMm9xcXF3YXpjdDQyIn0.ue7QSwwh6AX6U5o__nEt8w";

const map = new MB.Map({
  accessToken: token,
  container: "mapid",
  trackResize: true,
  style: "mapbox://styles/mapbox/outdoors-v10?optimize=true",
  minZoom: 3,
  center: [-21.9270884, 64.1436456],
  zoom: 13
});

async function getCurrentCoords(): Promise<Coords> {
  const pos: GeolocationPosition =
    // handle rejection...
    await new Promise((resolve, reject) =>
                      navigator.geolocation.getCurrentPosition(
                        res => resolve(res),
                        err => reject(err)
                      )
                     );
  return pos.coords;
}

const locationList = document.getElementById("locations");

function locationItemTemplate(title: string, loc: Coords) {
  const template = document.createElement("template");
  const body =  `
    <div class="item">
      <h2>${title}</h2>
      <p>${loc.latitude} ${loc.longitude}</p>
    </div>
  `.trim();
  template.innerHTML = body;
  return template.content.firstChild;
}

function hoverConnection(source: HTMLElement, target: HTMLElement) {
  source.addEventListener('mouseenter', () => {
    target.classList.add('hovered');
    source.classList.add('hovered');
  });
  source.addEventListener('mouseleave', () => {
    target.classList.remove('hovered');
    source.classList.remove('hovered');
  });
}

function createLocationItem(title: string, loc: Coords) {
  const elem = locationItemTemplate(title, loc) as HTMLElement;
  const marker = document.createElement('div');
  marker.className = 'marker';
  hoverConnection(elem, marker);
  hoverConnection(marker, elem);

  new MB.Marker(marker)
    .setLngLat({ lng: loc.longitude, lat: loc.latitude })
    .addTo(map);

  elem.addEventListener('click', () => {
    map.flyTo({
      center: [ loc.longitude, loc.latitude ],
      animate: false
    });
  });
  return elem;
}

async function go() {
  const pos = await getCurrentCoords();
  map.flyTo({
    center: [ pos.longitude, pos.latitude ],
    animate: false
  });
}

map.on('click', (e) => {
  const coords = { latitude: e.lngLat.lat, longitude: e.lngLat.lng };
  const what = createLocationItem("plop", coords);
  locationList.appendChild(what);
});

go();
