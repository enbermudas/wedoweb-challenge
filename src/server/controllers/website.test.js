import db from '../config/sequelize';
import WebsiteController from './website';

beforeAll(async () => await db.sequelize.sync({ alter: true, force: false }));

afterAll(async () => {
  await db.sequelize.dropAllSchemas({});
  db.sequelize.close();
});

it('Should create a new website.', async () => {
  const mockRequest = {
    body: {
      url: 'https://github.com/enbermudas'
    }
  };

  const mockResponse = {
    send: jest.fn(() => mockResponse),
    status: jest.fn(() => mockResponse)
  };

  await WebsiteController.createWebsite(mockRequest, mockResponse);

  expect(mockResponse.status).toBeCalledWith(201);
  expect(mockResponse.send.mock.calls[0][0]).toMatchSnapshot();
});

it('Should reject an invalid url.', async () => {
  const mockRequest = {
    body: {
      url: 'https://github'
    }
  };

  const mockResponse = {
    send: jest.fn(() => mockResponse),
    status: jest.fn(() => mockResponse)
  };

  await WebsiteController.createWebsite(mockRequest, mockResponse);

  expect(mockResponse.status).toBeCalledWith(400);
  expect(mockResponse.send.mock.calls[0][0]).toMatchSnapshot();
});

it('Should fail if no url is provided.', async () => {
  const mockRequest = {
    body: {
      nottherightparam: 'https://github.com'
    }
  };

  const mockResponse = {
    send: jest.fn(() => mockResponse),
    status: jest.fn(() => mockResponse)
  };

  await WebsiteController.createWebsite(mockRequest, mockResponse);

  expect(mockResponse.status).toBeCalledWith(400);
  expect(mockResponse.send.mock.calls[0][0]).toMatchSnapshot();
});
