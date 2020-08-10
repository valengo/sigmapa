let addMarkerModalId = '#add-marker-modal';
let categorySelectId = '#category-selection';
let subCategorySelectId = '#sub-category-selection';

let categories = [
    new MarkerCategory('Meio ambiente', '&#127795', [
        new MarkerCategory('Descarte irregular de resíduos sólidos', '&#127795'),
        new MarkerCategory('Vazadouro a céu aberto', '&#127795'),
        new MarkerCategory('Presença de lixão', '&#127795'),
        new MarkerCategory('Poluição de rios', '&#127795'),
        new MarkerCategory('Imóveis abandonados, possíveis focos de doenças', '&#127795'),
        new MarkerCategory('Sugestão de inclusão de novos ecopontos', '&#127795')

    ]),
    new MarkerCategory('Urbanismo', '&#127974', [
        new MarkerCategory('Buraco na pista', '&#127974'),
        new MarkerCategory('Rua sem asfalto', '&#127974'),
        new MarkerCategory('Acidente de trânsito', '&#127974'),
        new MarkerCategory('Violência urbana: assalto, furto etc', '&#127974'),
        new MarkerCategory('Poluição Sonora: carros de som, lojas e etc', '&#127974')

    ]),
    new MarkerCategory('População', '&#128106', [
        new MarkerCategory('Área com risco de desabamento', '&#128106'),
        new MarkerCategory('Enchentes', '&#128106')
    ])
];

let map;
var lastMarker = undefined;

/**
 * Map handling
 */

function initMap(elementId='map') {
    let uluru = {lat: -3.7899266, lng: -38.5889873};
    map = new google.maps.Map(
        document.getElementById(elementId), {zoom: 11, center: uluru});

    map.addListener('click', handleMapClick)

}

function handleMapClick(e) {
    console.log('lat: ', e.latLng.lat(), 'lng: ', e.latLng.lng())

    lastMarker = new google.maps.Marker({
        position: e.latLng,
        map: map
    });

    // noinspection JSUnresolvedFunction
    $(addMarkerModalId).modal('toggle')
}

/**
 * Selectors handling
 */

$(categorySelectId).change(function (){
    let selectedCategory = $(this).children("option:selected").val();
    let subCategories = categories[selectedCategory -1].subCategories

    $(subCategorySelectId).empty()
    for (let i = 0; i < subCategories.length; i++) {
        $(subCategorySelectId).append(
            '<option>' + subCategories[i].title + '</option>'
        );
    }
});


/**
 *  Buttons handling
 */

$('#add-marker-btn').click(function (){
    console.log('Add marker now!');

    let selectedCategory = $(categorySelectId).children("option:selected").val();
    let selectedSubCategory = $(subCategorySelectId).children("option:selected").val();

    console.log(selectedCategory, selectedSubCategory)

    lastMarker = undefined;

    // noinspection JSUnresolvedFunction
    $(addMarkerModalId).modal('toggle')
});

$('#cancel-add-marker-btn').click(function (){
    console.log('Cancel adding marker now!')
});

/**
 * Modal handling
 */

$(addMarkerModalId).on('hidden.bs.modal', function () {
    if (lastMarker !== undefined) {
        lastMarker.setMap(null);
    }
});


