function initMap() {
    // The location of Uluru
    var uluru = {lat: -3.7899266, lng: -38.5889873};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('mainMap'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
}