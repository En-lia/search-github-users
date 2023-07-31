import { getTotalPage } from '../utils/helper';

describe('helpers: getTotalPage', () => {
    test('Check the number of pages -  multiple count of users', () => {
        expect(getTotalPage(50)).toEqual(5);
    });

    test('Check the number of pages - count of users is greater then rest', () => {
        expect(getTotalPage(51)).toEqual(6);
    });

    test('Check the number of pages - count of users is less then rest', () => {
        expect(getTotalPage(49)).toEqual(5);
    });

    test('Check the number of pages with null', () => {
        expect(getTotalPage(null)).toEqual(0);
    });

    test('Check the number of pages with undefined', () => {
        expect(getTotalPage(undefined)).toEqual(0);
    });
});