import { flameAdvancement } from '../src/flameAdvancement.js';

describe('flameAdvancement', () => {
    it('should return 0 if the date is before the start date', async () => {
        const date = '2024-05-08';
        expect(await flameAdvancement(date)).toBe(0);
    });

    it('should return 100 if the date is after the end date', async () => {
        const date = '2024-07-26';
        expect(await flameAdvancement(date)).toBe(100);
    });

    it('should return 50 if the date is halfway between the start and end dates', async () => {
        const date = '2024-06-17';
        expect(await flameAdvancement(date)).toBe(51);
    });

    it('should return 100 if the date is the end date', async () => {
        const date = '2024-07-25';
        expect(await flameAdvancement(date)).toBe(100);
    });

    it('should return 0 if the date is the start date', async () => {
        const date = '2024-05-09';
        expect(await flameAdvancement(date)).toBe(0);
    });

    it('should throw an error if no date is provided', async () => {
        try {
            await flameAdvancement();
        } catch (e) {
            expect(e.message).toBe("No date provided");
        }
    });

});
