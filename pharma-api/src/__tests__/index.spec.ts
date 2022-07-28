import supertest from 'supertest';

import app from '../app';

const request = supertest(app);

describe('/ endpoint test', () => {
  it('should return a json with an info message', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).message).toEqual(
      'REST Fullstack Challenge 20201209 Running',
    );
  });
});
