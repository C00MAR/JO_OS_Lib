import { sportToArea } from '../src/sportToArea';

global.fetch = jest.fn((url) => {
    if (url.includes('refine.sports=Unknown')) {
        return Promise.resolve({
            json: () => Promise.resolve({
                records: []
            })
        });
    }
    return Promise.resolve({
        json: () => Promise.resolve({
            records: [
                {
                    fields: {
                        nom_site: "Arena Bercy",
                        point_geo: [48.83863, 2.378597]
                    }
                },
                {
                    fields: {
                        nom_site: "Stade Pierre Mauroy",
                        point_geo: [50.61190661, 3.13047318]
                    }
                }
            ]
        })
    });
});

describe('sportToArea', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should return an array of areas for the given sport', async () => {
        const sport = 'Basketball';
        const expectedAreas = [
            {
                name: "Arena Bercy",
                position: { lat: 48.83863, lng: 2.378597 }
            },
            {
                name: "Stade Pierre Mauroy",
                position: { lat: 50.61190661, lng: 3.13047318 }
            }
        ];

        const areas = await sportToArea(sport);
        expect(areas).toEqual(expectedAreas);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?where=%22Basketball%22");
    });

    it('should return an empty array if the sport is not found', async () => {
        const sport = 'Unknown';
        const expectedAreas = [];

        const areas = await sportToArea(sport);
        expect(areas).toEqual(expectedAreas);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?where=%Unknow%22");
    });

    it('should return an empty array if the sport is not provided', async () => {
        const sport = '';
        const expectedAreas = [];

        const areas = await sportToArea(sport);
        expect(areas).toEqual(expectedAreas);
        expect(fetch).toHaveBeenCalledTimes(0);
    });
});
