import { displayAmount } from '../commonUtils';

describe('#DisplayAmount', () => {
    it.each([
        ['61776792004700431', 18, '0.06178'],
        ['559434119616550549964644', 18, '559,434.11962'],
        ['0', 18, '0'],
        ['553183935', 8, '5.53184'],
        ['20819427', 8, '0.20819'],
    ])(
        'should display %i with %s decimals to be %j',
        (amt, decimals, expected) => {
            const res = displayAmount(amt, decimals);
            expect(res).toBe(expected);
        }
    );
});
