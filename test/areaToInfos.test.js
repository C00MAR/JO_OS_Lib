import areaToInfos from '../src/areaToInfos';

describe('areaToInfos', () => {
    it('should return an array of competition site information', async () => {
        const spot = 'Pont Alexandre III';
        const expected = [
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
            ];

        const result = await areaToInfos(spot);

        expect(result).toEqual(expected);
    });

    it('should throw an error if the given spot is invalid', async () => {
        const spot = '';
        await expect(areaToInfos(spot)).rejects.toThrow('Given spot is invalid');
    });

    it('should throw an error if the API response format is invalid', async () => {
        const spot = 'Invalid Spot';
        await expect(areaToInfos(spot)).rejects.toThrow('Invalid API response format');
    });
});
