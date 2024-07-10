import dateToInfos from '../src/dateToInfos';

// Mock the fetch function
global.fetch = jest.fn();

beforeEach(() => {
    fetch.mockClear();
});

describe('dateToInfos', () => {
    it('should return correct data for valid API response', async () => {
        const mockResponse = {
            results: [
                {
                    nom_site: 'Stade de France',
                    sports: ['Athlétisme'],
                    start_date: '2024-07-26',
                    end_date: '2024-08-11'
                },
                {
                    nom_site: 'Parc des Princes',
                    sports: ['Football'],
                    start_date: '2024-07-26',
                    end_date: '2024-08-11'
                }
            ]
        };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse)
        });

        const date = '2024-07-26';
        const data = await dateToInfos(date);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?refine=start_date:"${date}"`);
        expect(data).toEqual([
            {
                nom_site: 'Stade de France',
                sports: ['Athlétisme'],
                start_date: '2024-07-26',
                end_date: '2024-08-11'
            },
            {
                nom_site: 'Parc des Princes',
                sports: ['Football'],
                start_date: '2024-07-26',
                end_date: '2024-08-11'
            }
        ]);
    });

    it('should throw error when API request fails', async () => {
        fetch.mockRejectedValueOnce(new Error('API request failed'));

        const date = '2024-07-26';

        await expect(dateToInfos(date)).rejects.toThrow('API request failed');
    });

    it('should throw error for invalid API response format', async () => {
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(null)
        });

        const date = '2024-07-26';

        await expect(dateToInfos(date)).rejects.toThrow('Invalid API response format');
    });
});
