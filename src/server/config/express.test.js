import supertest from 'supertest';
import app from './express';

const port = process.env.PORT || 4000;

const server = app.listen(port);

const request = supertest(server);

afterAll(() => server.close());

// Status
it('Should return a success message', async () => {
  const res = await request.get('/api/v1');

  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toBe('Server is online.');
});
