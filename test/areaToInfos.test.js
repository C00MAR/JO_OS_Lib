import areaToInfos from '../src/areaToInfos';

// Mock the fetch function
global.fetch = jest.fn();

beforeEach(() => {
    fetch.mockClear();
});

describe('areaToInfos', () => {
    it('should return an array of competition site information', async () => {
        const spot = 'Pont Alexandre III';
        const mockResponse = {
            results: [
                {
                    nom_site: 'Pont Alexandre III',
                    sports: 'Cyclisme sur route - arrivée Contre-la-montre (CRD), Natation marathon (OWS), Triathlon (TRI)',
                    start_date: '2024-07-27',
                    end_date: '2024-08-09'
                },
                {
                    nom_site: 'Pont Alexandre III',
                    sports: 'Para Triathlon (PTRI)',
                    start_date: '2024-09-01',
                    end_date: '2024-09-02'
                }
            ]
        };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse)
        });

        const expected = mockResponse.results.reverse();
        const result = await areaToInfos(spot);
        expect(result).toEqual(expected);
    });

    it('should throw an error if the given spot is invalid', async () => {
        const spot = '';
        await expect(areaToInfos(spot)).rejects.toThrow('Given spot is invalid');
    });

    it('should throw an error if the API response format is invalid', async () => {
        const spot = 'Invalid Spot';

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(null)
        });

        await expect(areaToInfos(spot)).rejects.toThrow('Invalid API response format');
    });

    it('should throw an error if API response results are undefined', async () => {
        const spot = 'Pont Alexandre III';

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({})
        });

        await expect(areaToInfos(spot)).rejects.toThrow('Invalid API response format');
    });

    it('should throw an error if API response results are empty', async () => {
        const spot = 'Pont Alexandre III';

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ results: [] })
        });

        await expect(areaToInfos(spot)).rejects.toThrow('Invalid API response format');
    });

    it('should throw an error if fetch fails', async () => {
        const spot = 'Pont Alexandre III';

        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        await expect(areaToInfos(spot)).rejects.toThrow('Invalid API response format');
    });

    it('should handle cases where no sites match the given spot', async () => {
        const spot = 'Pont Alexandre III';
        const mockResponse = {
            results: [
                {
                    nom_site: 'Eiffel Tower',
                    sports: 'Basketball',
                    start_date: '2024-07-27',
                    end_date: '2024-08-09'
                }
            ]
        };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse)
        });

        await expect(areaToInfos(spot)).rejects.toThrow('Invalid API response format');
    });
});
