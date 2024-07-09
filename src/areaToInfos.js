/**
 * Retrieves information about competition sites based on a given spot.
 * @param {string} spot - The spot to search for competition sites.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects containing information about the competition sites.
 * @throws {Error} - If there is an error fetching the competition sites.
 */
export default async function areaToInfos(spot) {
    const apiUrl = `https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?where=%22${spot}%22`;
    let infos = [];
    if (!spot) {
        throw new Error('Given spot is invalid');
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].nom_site === spot) {
                infos.push({
                    nom_site: data.results[i].nom_site,
                    sports: data.results[i].sports,
                    start_date: data.results[i].start_date,
                    end_date: data.results[i].end_date
                });
            }
        }
        if (infos.length === 0 || (!data || !data.results)) {
            throw new Error('Invalid API response format');
        }
    } catch (error) {
        throw new Error('Invalid API response format');
    }
    return infos;
}
