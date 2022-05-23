import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@infra/database/typeorm';
import { app } from '@infra/http/app';

let connection: Connection;
const sendMailMock = jest.fn((mailOptions, callback) => callback());

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: () => sendMailMock,
  }),
}));

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new User', async () => {
    const user = {
      name: 'any_name',
      email: 'any_valid_email@mail.com',
      password: 'valid_password',
      confirmPassword: 'valid_password',
    };

    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
