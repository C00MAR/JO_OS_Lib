import { flamePosition } from "../src/flameposition";

global.fetch = jest.fn((url) => {
    return Promise.resolve({
        json: () => Promise.resolve({
            records: [
                {
                    "start_datetime":"2024-05-19T16:01:41+00:00",
                    "longitude":0.07534,
                    "latitude":43.22828,
                    "geolocation":{
                        "lon":0.07534,
                        "lat":43.22828
                    }
                }
            ]
        })
    });
});

describe('flamePosition', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should return the last position know of the olympic flame', async () => {
        const expectedPosition = { lat: 43.22828, lng: 0.07534 };

        const position = await flamePosition();
        expect(position).toEqual(expectedPosition);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-flamme-olympique/records?where=%222024-07-09order_by=%22start_datetime%20DESC%22%22&limit=1");
    });
});