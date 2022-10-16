import { doesNotMatch, doesNotReject } from 'assert';
import { app } from '../src/api';
const request = require('supertest');

describe('routes', () => {
    describe('get anime route', () => {
        describe('given the anime does not exist', () => {
            it('should return an empty list', async () => {
                const animeName = 'no way an anime has this name';

                await request(app).get(`/anime?title=${animeName}`).expect([]);
            });
            
            it('should return some anime', async () => {
                const animeName = 'charlotte';

                const response = await request(app).get(`/anime?title=${animeName}`);
                expect(!Object.keys(response.body).length).toBe(false);
            });
        });
    });

    describe('get manga route', () => {
        describe('given the manga does not exist', () => {
            it('should return an empty list', async () => {
                const mangaName = 'no way an manga has this name';

                await request(app).get(`/manga?title=${mangaName}`).expect([]);
            });


            it('should return some manga', async () => {
                const mangaName = 'charlotte';

                const response = await request(app).get(`/manga?title=${mangaName}`);
                expect(!Object.keys(response.body).length).toBe(false);
            });
        });
    });

    describe('get webtoon route', () => {
        describe('given the webtoon does not exist', () => {
            it('should return an empty list', async () => {
                const webtoonName = 'no way an webtoon has this name';

                await request(app).get(`/webtoon?title=${webtoonName}`).expect([]);
            });

            
            it('should return some webtoon', async () => {
                const webtoonName = 'charlotte';

                const response = await request(app).get(`/webtoon?title=${webtoonName}`);
                expect(!Object.keys(response.body).length).toBe(false);
            });
        });
    });

    describe('get novel route', () => {
        describe('given the novel does not exist', () => {
            it('should return an empty list', async () => {
                const novelName = 'no way an novel has this name';

                await request(app).get(`/novel?title=${novelName}`).expect([]);
            });


            it('should return some novel', async () => {
                const novelName = 'charlotte';

                const response = await request(app).get(`/novel?title=${novelName}`);
                expect(!Object.keys(response.body).length).toBe(false);
            });
        });
    });
});