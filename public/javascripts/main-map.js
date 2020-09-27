const MarkerColors = {
    GREEN: 1,
    BLUE: 2,
    RED: 3
}

let addMarkerModalId = '#add-marker-modal';
let categorySelectId = '#category-selection';
let subCategorySelectId = '#sub-category-selection';

let categories = [
    new MarkerCategory(1, 'Meio ambiente', '&#127795', [
        new MarkerCategory(1, 'Descarte irregular de resíduos sólidos', '&#127795'),
        new MarkerCategory(2, 'Vazadouro a céu aberto', '&#127795'),
        new MarkerCategory(3, 'Presença de lixão', '&#127795'),
        new MarkerCategory(4, 'Poluição de rios', '&#127795'),
        new MarkerCategory(5, 'Imóveis abandonados', '&#127795'),
        new MarkerCategory(6, 'Sugestão de inclusão de novos ecopontos', '&#127795')

    ]),
    new MarkerCategory(2, 'Urbanismo', '&#127974', [
        new MarkerCategory(7, 'Buraco na pista', '&#127974'),
        new MarkerCategory(8, 'Rua sem asfalto', '&#127974'),
        new MarkerCategory(9, 'Acidente de trânsito', '&#127974')
    ]),
    new MarkerCategory(3, 'População', '&#128106', [
        new MarkerCategory(10, 'Área com risco de desabamento', '&#128106'),
        new MarkerCategory(11, 'Enchentes', '&#128106')
    ])
];

let map;
let lastMarker = undefined;
let blueMarker = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
let greenMarker = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
let redMarker = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"


/**
 * Map handling
 */

function initMap(elementId = 'map') {
    let uluru = {lat: -3.7899266, lng: -38.5889873};
    map = new google.maps.Map(
        document.getElementById(elementId), {zoom: 11, center: uluru});

    getMainMapData();

    map.addListener('click', handleMapClick)

}

function getMainMapData() {
    $.ajax({
        url: '/main-map/data',
        type: 'GET',
    }).done(function (data) {
        // TODO handle possible error
        let mapData = JSON.parse(data);
        plotMapData(mapData);
    }).catch(function (error) {
        document.documentElement.innerHTML = error.responseText;
    });
}

function sendReport(categoryId, location) {
    let report = new Report(null, null,
        1, categoryId, null, location);
    $.ajax({
        url: '/report',
        type: 'POST',
        data: {report: report},
    }).done(function (data) {
        // TODO show success message
        console.log('Report added!' + data);
    }).catch(function (error) {
        document.documentElement.innerHTML = error.responseText;
    });
}

function addMarker(lat, long, markerColor) {
    let iconUrl = redMarker;
    switch (parseInt(markerColor)) {
        case MarkerColors.RED:
            iconUrl = redMarker;
            break;
        case MarkerColors.BLUE:
            iconUrl = blueMarker;
            break;
        case MarkerColors.GREEN:
            iconUrl = greenMarker;
    }

    console.log(markerColor, iconUrl);

    let position = new google.maps.LatLng(lat, long);
    return new google.maps.Marker({
        position: position,
        map: map,
        icon: {
            url: iconUrl
        }
    });
}

function mapParentCategory(subcategory) {
    let category = parseInt(subcategory);
    if (category > 0 && category < 7) {
        return 1;
    } else if (category < 10) {
        return 2;
    } else {
        return 3;
    }

}

function plotMapData(mapData) {
    for (let i = 0; i < mapData.reports.length; ++i) {
        let report = mapData.reports[i];
        addMarker(report.location.x, report.location.y, mapParentCategory(report.subcategoryId));
    }

    for (let i = 0; i < mapData.markers.length; ++i) {
        let marker = mapData.markers[i];
        addMarker(marker.location.x, marker.location.y, mapParentCategory(marker.subcategoryId));
    }
}

function handleMapClick(e) {
    let selectedCategory = $(categorySelectId).children("option:selected").val();
    lastMarker = addMarker(e.latLng.lat(), e.latLng.lng(), selectedCategory);
    // noinspection JSUnresolvedFunction
    $(addMarkerModalId).modal('toggle')
}

/**
 * Selectors handling
 */

$(categorySelectId).change(function () {
    let selectedCategory = $(this).children("option:selected").val();
    let subCategories = categories[selectedCategory - 1].subCategories

    $(subCategorySelectId).empty()
    for (let i = 0; i < subCategories.length; i++) {
        $(subCategorySelectId).append(
            '<option value="' + subCategories[i].categoryId + '">' + subCategories[i].title + ' </option>'
        );
    }
});


/**
 *  Buttons handling
 */

$('#add-marker-btn').click(function () {
    let selectedSubCategory = $(subCategorySelectId).children("option:selected").val();

    console.log(lastMarker);
    sendReport(selectedSubCategory, {
        lat: lastMarker.position.lat(),
        long: lastMarker.position.lng()
    });

    lastMarker = undefined;

    // noinspection JSUnresolvedFunction
    $(addMarkerModalId).modal('toggle')
});

$('#cancel-add-marker-btn').click(function () {
});

/**
 * Modal handling
 */

$(addMarkerModalId).on('hidden.bs.modal', function () {
    if (lastMarker !== undefined) {
        lastMarker.setMap(null);
    }
});




