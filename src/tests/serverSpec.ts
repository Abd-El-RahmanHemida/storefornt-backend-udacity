import supertest from 'supertest';
import app from '../server';
const request = supertest(app);

describe('test  server', (): void => {
    it('test  endpoint /', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/');

        expect(response.status).toBe(200);
    });
});
