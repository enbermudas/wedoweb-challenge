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

it('Should sign in a previously registered user', async () => {
  const mockRequest = {
    body: {
      email: 'testemail@email.com',
      password: '12345678'
    }
  };

  const mockResponse = {
    send: jest.fn(() => mockResponse),
    status: jest.fn(() => mockResponse)
  };

  await AuthController.signin(mockRequest, mockResponse);

  expect(mockResponse.status).toBeCalledWith(200);
  expect(mockResponse.send.mock.calls[0][0]).toMatchSnapshot();
});

it('Should fail on signin in with an unexisting email', async () => {
  const mockRequest = {
    body: {
      email: 'wrongemail@email.com',
      password: '12345678'
    }
  };

  const mockResponse = {
    send: jest.fn(() => mockResponse),
    status: jest.fn(() => mockResponse)
  };

  await AuthController.signin(mockRequest, mockResponse);

  expect(mockResponse.status).toBeCalledWith(400);
  expect(mockResponse.send.mock.calls[0][0]).toMatchSnapshot();
});

it('Should fail on signin in with wrong password', async () => {
  const mockRequest = {
    body: {
      email: 'testemail@email.com',
      password: '123456789123'
    }
  };

  const mockResponse = {
    send: jest.fn(() => mockResponse),
    status: jest.fn(() => mockResponse)
  };

  await AuthController.signin(mockRequest, mockResponse);

  expect(mockResponse.status).toBeCalledWith(400);
  expect(mockResponse.send.mock.calls[0][0]).toMatchSnapshot();
});

it('Should fail on signin in with a missing field', async () => {
  const mockRequest = {
    body: {
      email: 'testemail@email.com'
    }
  };

  const mockResponse = {
    send: jest.fn(() => mockResponse),
    status: jest.fn(() => mockResponse)
  };

  await AuthController.signin(mockRequest, mockResponse);

  expect(mockResponse.status).toBeCalledWith(400);
  expect(mockResponse.send.mock.calls[0][0]).toMatchSnapshot();
});
