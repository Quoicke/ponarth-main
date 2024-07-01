function activateMap() {
    const mapOverlay = document.querySelector('.map-overlay');
    mapOverlay.style.opacity = '0';
    mapOverlay.style.pointerEvents = 'none';
}

document.addEventListener('click', function(event) {
    const mapContainer = document.querySelector('.map-container');
    const mapOverlay = document.querySelector('.map-overlay');

    if (!mapContainer.contains(event.target)) {
        setTimeout(() => {
            mapOverlay.style.opacity = '1';
            mapOverlay.style.pointerEvents = 'auto';
        }, 500);
    }
});
