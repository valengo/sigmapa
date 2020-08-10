function initMap(elementId='mainMap') {
    // The location of Uluru
    let uluru = {lat: -3.7899266, lng: -38.5889873};
    // The map, centered at Uluru
    let map = new google.maps.Map(
        document.getElementById(elementId), {zoom: 11, center: uluru});
    // The marker, positioned at Uluru
    let marker = new google.maps.Marker({position: uluru, map: map});
}