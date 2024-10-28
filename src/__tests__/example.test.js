const request = require('supertest');
const app = require('../index'); // Make sure this points to your app

describe('GET /', () => {
  it('should return a Hello, World! message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello, World!');
  });
});
