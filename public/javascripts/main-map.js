const MarkerColors = {
    GREEN: 1,
    BLUE: 2,
    RED: 3
}

const ReportStatus = {
    N: 'N',
    V: 'V',
    R: 'R'
}

let addMarkerModalId = '#add-marker-modal';
let categorySelectId = '#category-selection';
let subCategorySelectId = '#sub-category-selection';

let map;
let infoWindow;
let lastMarker = undefined;
let blueMarker = "/images/blue-dot.png"
let greenMarker = "/images/green-dot.png"
let redMarker = "/images/red-dot.png"


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

        let initialData = await $.ajax({
            url: '/main-map/data',
            type: 'GET',
        });
        let parsedData = JSON.parse(initialData);
        UserRepository.update(parsedData.user);
        plotMapData(parsedData);
    } catch (error) {
        if (error.responseText !== undefined) {
            document.documentElement.innerHTML = error.responseText;
        } else {
            document.documentElement.innerHTML = error.toString();
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
        if (error.responseText !== undefined) {
            document.documentElement.innerHTML = error.responseText;
        } else {
            document.documentElement.innerHTML = error.toString();
        }
    });
}

/**
 * Other functions
 */

function addReportMarker(report) {
    if (report.reportStatusId === ReportStatus.R) {
        return;
    }

    let position = new google.maps.LatLng(report.location.x, report.location.y);
    let category = CategoryRepository.getCategoryId(report.subcategoryId);

    let iconUrl = redMarker;
    switch (category) {
        case MarkerColors.RED:
            iconUrl = redMarker;
            break;
        case MarkerColors.BLUE:
            iconUrl = blueMarker;
            break;
        case MarkerColors.GREEN:
            iconUrl = greenMarker;
    }

    let marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: {
            url: iconUrl
        },
        report: report
    });

    marker.addListener('click', () => {
        showInfoWindow(marker, report);
    });

    return marker;

}

function showInfoWindow(marker, report) {
    if (infoWindow !== undefined) {
        infoWindow.close();
    }

    let category = CategoryRepository.getCategoryId(report.subcategoryId);
    let subcategory = CategoryRepository.getSubcategory(report.subcategoryId);

    let emojiHex = '&#128106'
    switch (category) {
        case MarkerColors.RED:
            emojiHex = '&#128106';
            break;
        case MarkerColors.BLUE:
            emojiHex = '&#127974'
            break;
        case MarkerColors.GREEN:
            emojiHex = '&#127795'
    }

    let buttonsDiv = '';

    if (UserRepository.isAdmin()) {
        buttonsDiv = '<div class="float-right"><button type="button" class="btn btn-danger">Recusar</button> ' +
            '<button type="button" class="btn btn-success">Aceitar</button> </div>';

        if (report.reportStatusId === ReportStatus.V) {
            buttonsDiv = '<div class="float-right"><button type="button" class="btn btn-danger">Apagar</button> ' +
                ' </div>';
        }
    }

    let pMessage = '';
    if (report.reportStatusId === ReportStatus.N) {
        pMessage = 'Notificação ainda não avaliada.';
    }

    let infoWindowContent =
        '<div class="container"> ' +
        '   <div class="row">' +
        '       <div class="col-12">' +
        `           <h3 class="mt-3 mb-3">${emojiHex} ${subcategory.description}</h3>` +
        `           <p>${pMessage}</p>` +
        `               ${buttonsDiv}` +
        '               ' +
        '       </div>' +
        '   </div>' +
        '</div>';

    infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

    infoWindow.open(map, marker);
}

function createMarker(lat, long, markerColor) {
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
        addReportMarker(report)
    }

    for (let i = 0; i < mapData.markers.length; ++i) {
        let marker = mapData.markers[i];
        let subcategoryId = Number(marker.subcategoryId);
        createMarker(marker.location.x, marker.location.y, CategoryRepository.getCategoryId(subcategoryId));
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
    lastMarker = createMarker(e.latLng.lat(), e.latLng.lng(), selectedCategory);
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
    createMarker(position.lat(),
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
