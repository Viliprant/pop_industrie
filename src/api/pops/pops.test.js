const supertest = require('supertest');

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('../../app');

dotenv.config();

describe('App', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });
  });
  it('should respond with a empty object.', async () => {
    const response = await supertest(app)
      .get('/api/pops')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual('List of Funko Pop.');
    afterAll(() => mongoose.disconnect());
  });
});
