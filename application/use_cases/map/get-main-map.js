module.exports = (MapRepository) => {
    async function Perform(mainMapId) {
        let map = await MapRepository.getOneById(mainMapId);
        if (map === null || map === undefined) {
            throw new Error(`Failed getting main map with id ${mainMapId}. Does it exist?`);
        }
        return map;
    }

    return {
        Perform
    };
}