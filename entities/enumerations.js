const ReportStatus = {
    NEW: 'N',
    VERIFIED: 'V',
    REFUSED: 'R'
};

const UserRoles = {
    ADMIN: 'A',
    USER: 'U'
};


module.exports = (() => {
    return {
        ReportStatus,
        UserRoles
    }
})();