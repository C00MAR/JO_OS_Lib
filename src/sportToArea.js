/**
 * Function that takes a sport as input and returns an array of areas that support that sport.
 * @param {string} sport - The sport for which areas are to be retrieved.
 * @returns {Array} - An array of areas in the format [{name: "area1", position: {lat: 0, lng: 0}}, ...].
 */

export async function sportToArea(sport) {
    if (!sport) return [];

    const API = "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records";
    const filter = `refine.sports=${encodeURIComponent(sport)}`;

    const request = `${API}?${filter}`;

    const response = await fetch(request);
    const data = await response.json();

    const areas = data.records.map(record => ({
        name: record.fields.nom_site,
        position: {
            lat: parseFloat(record.fields.point_geo[0]),
            lng: parseFloat(record.fields.point_geo[1])
        }
    }));

    return areas;
}
