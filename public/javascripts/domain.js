class MarkerCategory {
    constructor(categoryId, title, iconCode, subCategories) {
        this.categoryId = categoryId;
        this.title = title;
        this.iconCode = iconCode;
        this.subCategories = subCategories;
    }
}

class Report {
    constructor(reportId, userId, mapId, subcategoryId, reportStatusId, location, note) {
        this.reportId = reportId;
        this.userId = userId;
        this.mapId = mapId;
        this.subcategoryId = subcategoryId;
        this.reportStatusId = reportStatusId;
        this.location = location;
        this.note = note;
    }
}