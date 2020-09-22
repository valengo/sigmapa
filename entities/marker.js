module.exports = class Marker {
    constructor(markerId, mapId, subcategoryId, location) {
        this.markerId = markerId;
        this.mapId = mapId;
        this.subcategoryId = subcategoryId;
        this.location = location;
    }
}