import areaToSport from '../src/areaToSport';

describe('areaToSport', () => {
    it('should retrieve sports associated with a given spot', async () => {
        const spot = 'Arena Paris Sud 6';
        const expectedSports = ['sport1', 'sport2'];

        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                results: [
                    { nom_site: spot, sports: expectedSports },
                    { nom_site: 'otherSpot', sports: ['otherSport'] },
                ],
            }),
        });

        const sports = await areaToSport(spot);

        expect(sports[0]).toEqual(expectedSports);
        expect(fetch).toHaveBeenCalledWith(
            `https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?where=%22${spot}%22`
        );
    });

    it('should throw an error if there is an error fetching the competition sites', async () => {
        const spot = 'exampleSpot';
        const expectedError = new Error('Error fetching competition sites');

        // Mock the fetch function to throw an error
        global.fetch = jest.fn().mockRejectedValue(expectedError);

        await expect(areaToSport(spot)).rejects.toThrow(expectedError);
        expect(fetch).toHaveBeenCalledWith(
            `https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?where=%22${spot}%22`
        );
    });
});