/**
 * Retrieves information about competition sites for a given date.
 * @param {string} date - The date for which to retrieve information.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects containing information about competition sites.
 * @throws {Error} - If the API response format is invalid.
 */
export default async function dateToInfos(date) {
    const apiUrl = `https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?refine=start_date:"${date}"`;
    const infos = [];

    try {
        const response = await fetch(apiUrl);
        var data = await response.json();
    } catch (error) {
        throw error;
    }

    if (data) {
        for (let i = 0; i < data.results.length; i++) {
            infos.push({
                nom_site: data.results[i].nom_site,
                sports: data.results[i].sports,
                start_date: data.results[i].start_date,
                end_date: data.results[i].end_date
            });
        }
    } else {
        throw new Error('Invalid API response format');
    }

    return infos;
}