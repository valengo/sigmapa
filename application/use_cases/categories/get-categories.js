module.exports = (CategoryRepository) => {
    async function Perform() {
        return await CategoryRepository.getAll();
    }

    return {
        Perform
    };
}