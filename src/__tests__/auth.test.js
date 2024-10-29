const request = require('supertest');
const app = require('../index'); // Adjust path as necessary

describe('Authentication API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/users/register').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword',
    });
    expect(res.statusCode).toBe(201);
  }, 15000); // Set timeout to 15 seconds for this test

  it('should log in an existing user', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'testuser@example.com',
      password: 'testpassword',
    });
    expect(res.statusCode).toBe(200);
  }, 15000); // Set timeout to 15 seconds for this test
});
