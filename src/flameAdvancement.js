/**
 * Function that take string Date in input and return percentage of the advencement of the olympic flame parcours
 * @param {string} date - The date of the day in the format "YYYY-MM-DD".
 * @returns {number} - The percentage of the advancement of the olympic flame parcours.
 */

export async function flameAdvancement(date) {
    // If no date is provided, throw an error
    if (!date) {
        throw new Error("No date provided");
    }

    const startDate = new Date("2024-05-09");
    const endDate = new Date("2024-07-25");

    const currentDate = new Date(date);

    if (currentDate < startDate) {
        return 0;
    }

    if (currentDate > endDate) {
        return 100;
    }

    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    const currentDays = (currentDate - startDate) / (1000 * 60 * 60 * 24);

    return Math.round((currentDays / totalDays) * 100);
}
