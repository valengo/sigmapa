
function initMap(elementId='map') {
    let uluru = {lat: -3.7899266, lng: -38.5889873};
    let map = new google.maps.Map(
        document.getElementById(elementId), {zoom: 11, center: uluru});

    map.addListener('click', handleMapClick)

}

function handleMapClick(e) {
    console.log('lat: ', e.latLng.lat(), 'lng: ', e.latLng.lng())

    // noinspection JSUnresolvedFunction
    $('#add-marker-modal').modal('toggle')
}

