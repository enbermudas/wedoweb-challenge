import db from '../config/sequelize';
import AuthController from './auth';

beforeAll(async () => await db.sequelize.sync({ alter: true, force: false }));

afterAll(async () => {
  await db.sequelize.dropAllSchemas({});
  db.sequelize.close();
});

it('Should sign up a new a user.', async () => {
  const mockRequest = {
    body: {
      username: 'testuser',
      email: 'testemail@email.com',
      password: '12345678'
    }
  };

  const mockResponse = {
    send: jest.fn(() => mockResponse),
    status: jest.fn(() => mockResponse)
  };

  await AuthController.signup(mockRequest, mockResponse);

  expect(mockResponse.status).toBeCalledWith(201);
  expect(mockResponse.send.mock.calls[0][0]).toMatchSnapshot();
});

it('Should fail if the unique constraint is violated.', async () => {
  const mockRequest = {
    body: {
      username: 'testuser',
      email: 'testemail@email.com',
      password: '12345678'
    }
  };

  const mockResponse = {
    send: jest.fn(() => mockResponse),
    status: jest.fn(() => mockResponse)
  };

  await AuthController.signup(mockRequest, mockResponse);

  expect(mockResponse.status).toBeCalledWith(500);
  expect(mockResponse.send.mock.calls[0][0]).toMatchSnapshot();
});

it('Should fail if there a missing fields.', async () => {
  const mockRequest = {
    body: {
      username: 'testuser',
      email: 'testemail@email.com'
    }
  };

  const mockResponse = {
    send: jest.fn(() => mockResponse),
    status: jest.fn(() => mockResponse)
  };

  await AuthController.signup(mockRequest, mockResponse);

  expect(mockResponse.status).toBeCalledWith(400);
  expect(mockResponse.send.mock.calls[0][0]).toMatchSnapshot();
});
