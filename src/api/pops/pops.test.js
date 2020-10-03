const supertest = require('supertest');

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('../../app');

dotenv.config();

const Pop = require('./pops.model');

const pop = {
  name: 'Test',
  number_funko: '184t',
  franchise: 'Naruto Shippuden',
  url_image: 'test3t',
};

beforeAll(async () => {
  await mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });
});

describe('Pop routes', () => {
  it('should respond with an empty object.', async () => {
    const response = await supertest(app)
      .get('/api/pops')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.message).toEqual('List of Funko Pop.');
  });

  it('should respond with data of a test Pop.', async () => {
    const response = await supertest(app)
      .post('/api/pop')
      .send(pop)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.message).toEqual('Pop added.');
    await Pop.findOne({ number_funko: pop.number_funko }).select('-_id -__v').then((popFounded) => {
      expect(popFounded.toJSON()).toEqual(pop);
    });
    await Pop.deleteOne({ number_funko: '184t' }).then((result) => {
      expect(result.ok).toEqual(1);
      expect(result.n).toEqual(1);
    });
  });
});

it('should respond with data of Tobi Pop (184) .', async () => {
  const response = await supertest(app)
    .get('/api/pop/184')
    .send(pop)
    .expect('Content-Type', /json/)
    .expect(200);
  expect(response.body.message).toEqual('Pop 184');
  await Pop.findOne({ number_funko: '184' }).select('-_id -__v').then((popFounded) => {
    expect(popFounded.toJSON()).toEqual({
      name: 'Tobi',
      number_funko: '184',
      franchise: 'Naruto Shippuden',
      url_image: 'test3',
    });
  });
});

afterAll(() => mongoose.disconnect());
