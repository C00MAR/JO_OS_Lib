/**
 * Retrieves the sports associated with a given spot from the Paris 2024 competition sites API.
 * @param {string} spot - The name of the spot.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of sports associated with the city.
 * @throws {Error} - If there is an error fetching the competition sites or parsing the response.
 */
export default async function areaToSport(spot) {
    const apiUrl = `https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?where=%22${spot}%22`;
    let sports = [];

    try {
        const response = await fetch(apiUrl);
        var data = await response.json();
    } catch (error) {
        throw error;
    }

    data.results.forEach(event => {
        if (event.nom_site == spot) {
            sports.push(event.sports);
        }
    });

    return sports;
}