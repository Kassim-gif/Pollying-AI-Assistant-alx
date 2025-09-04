// File: tests/integration/voteApi.test.js
const request = require('supertest');
const app = require('../../src/app'); // Your Express app

describe('POST /api/vote', () => {
  it('should respond with 200 and record vote via API', async () => {
    const response = await request(app)
      .post('/api/vote')
      .send({
        pollId: 'poll123',
        userId: 'user456',
        optionId: 'option789'
      });


