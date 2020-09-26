const ShowInternalServerErrorModal = (errorMsg) => {
    let modalId = '#internal-server-error-modal';
    let pId = '#error-message'

    $(pId).text(errorMsg);

    // noinspection JSUnresolvedFunction
    $(modalId).modal('toggle');
}