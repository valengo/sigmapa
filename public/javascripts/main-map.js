const MarkerColors = {
    GREEN: 1,
    BLUE: 2,
    RED: 3
}

let addMarkerModalId = '#add-marker-modal';
let categorySelectId = '#category-selection';
let subCategorySelectId = '#sub-category-selection';

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

    retrieveData().then(() => undefined);

    map.addListener('click', handleMapClick)
}

/**
 * Server calls
 */

async function retrieveData() {
    try {
        const res = await $.ajax({
            url: '/categories',
            type: 'GET',
        });
        let categoryData = JSON.parse(res);
        CategoryRepository.update(categoryData.categories, categoryData.subcategories);
        configureCategorySelectors();

        const mapData = await $.ajax({
            url: '/main-map/data',
            type: 'GET',
        });
        plotMapData(JSON.parse(mapData));
    } catch (error) {
        if (error.responseText !== undefined) {
            document.documentElement.innerHTML = error.responseText;
        } else {
            console.log('ERRO -> ' + error);
        }
    }
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
    }).catch(function (error) {
        document.documentElement.innerHTML = error.responseText;
    });
}

/**
 * Other functions
 */

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

    let position = new google.maps.LatLng(lat, long);
    return new google.maps.Marker({
        position: position,
        map: map,
        icon: {
            url: iconUrl
        }
    });
}

function plotMapData(mapData) {
    for (let i = 0; i < mapData.reports.length; ++i) {
        let report = mapData.reports[i];
        let subcategoryId = Number(report.subcategoryId);
        addMarker(report.location.x, report.location.y, CategoryRepository.getCategoryId(subcategoryId));
    }

    for (let i = 0; i < mapData.markers.length; ++i) {
        let marker = mapData.markers[i];
        let subcategoryId = Number(marker.subcategoryId);
        addMarker(marker.location.x, marker.location.y, CategoryRepository.getCategoryId(subcategoryId));
    }
}

function configureCategorySelectors() {
    let selectedCategory = Number($(categorySelectId).children("option:selected").val());
    let subCategories = CategoryRepository.getSubcategories(selectedCategory);

    $(subCategorySelectId).empty()
    for (let i = 0; i < subCategories.length; i++) {
        $(subCategorySelectId).append(
            '<option value="' + subCategories[i].subcategoryId + '">' + subCategories[i].description + ' </option>'
        );
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
    configureCategorySelectors();
});


/**
 *  Buttons handling
 */

$('#add-marker-btn').click(function () {
    let selectedSubCategory = Number($(subCategorySelectId).children("option:selected").val());
    sendReport(selectedSubCategory, {
        lat: lastMarker.position.lat(),
        long: lastMarker.position.lng()
    });

    let position = lastMarker.position;
    lastMarker.setMap(null);

    // update marker skin
    addMarker(position.lat(),
        position.lng(),
        CategoryRepository.getCategoryId(selectedSubCategory));

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
