import { searchDB, formatSearch } from '../src/search_db';
const request = require('supertest');

describe('function testing', () => {
    it.todo('should return empty list');

    it.todo('should return something');

    it('should format search', () => {
        const searchTerm = 'kimetsu no yaiba';
        const newSearchTerm = formatSearch(searchTerm);

        expect(newSearchTerm).toBe('k.*i.*m.*e.*t.*s.*u.* .*n.*o.* .*y.*a.*i.*b.*a');
    });
});