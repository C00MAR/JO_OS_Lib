/**
 * Function that don't take any input and return the actual position of the olympic flame.
 * @returns {Object} - The position of the olympic flame in the format {lat: 0, lng: 0}.
 */

export async function flamePosition() {
    const API = "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-flamme-olympique/records";
    // Where today date (for the date), order by start_datetime DESC (for last know this date) and limit 1
    const filter = "where=%22" + new Date().toISOString().split('T')[0] + "order_by=%22start_datetime%20DESC%22%22&limit=1";

    const request = `${API}?${filter}`;

    const response = await fetch(request);
    const data = await response.json();

    const position = {
        lat: parseFloat(data.records[0].geolocation.lat),
        lng: parseFloat(data.records[0].geolocation.lon)
    };

    return position;
}