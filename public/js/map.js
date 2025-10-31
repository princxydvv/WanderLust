mapboxgl.accessToken = mapToken;

let coords = coordinates;

// if old listing has no coordinates, use default
if (!Array.isArray(coords) || coords.length !== 2) {
    coords = [77.2090, 28.6139]; // Default Delhi coords
}

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: coords,
    zoom: 9
});

// Create popup (no close button)
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 25,
    className: "map-popup"
}).setHTML(`
    <h3>Listing Location</h3>
    <p>${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}</p>
`);

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coords)
    .addTo(map);

// Show popup on hover
marker.getElement().addEventListener("mouseenter", () => {
    popup.setLngLat(coords).addTo(map);
});

// Hide popup when not hovering
marker.getElement().addEventListener("mouseleave", () => {
    popup.remove();
});
