import { searchDB, formatSearch } from '../src/search_db';

jest.setTimeout(10000);

describe('function testing', () => {
    it('should return empty list', async () => {
        const title = 'no series is going to have this ridiculous name';

        const result = await searchDB(title, 'anime');

        expect(result.length === 0).toBe(true);
    });

    it('should return something', async () => {
        const title = 'one';

        const result = await searchDB(title, 'anime');

        expect(result.length === 0).toBe(false);
    });

    it('should format search', () => {
        const searchTerm = 'kimetsu no yaiba';
        const newSearchTerm = formatSearch(searchTerm);

        expect(newSearchTerm).toBe(
            'k.*i.*m.*e.*t.*s.*u.* .*n.*o.* .*y.*a.*i.*b.*a'
        );
    });
});
