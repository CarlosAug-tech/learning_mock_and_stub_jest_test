import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@infra/database/typeorm';
import { app } from '@infra/http/app';
import { IMailProvider } from '@infra/container/providers/MailProvider/contracts/mail-provider';
import { EtherealMailProvider } from '@infra/container/providers/MailProvider/implementations/ethereal-mail-provider';

let connection: Connection;

jest.mock(
  '@infra/container/providers/MailProvider/implementations/ethereal-mail-provider',
);

const mailOptionsFake = {
  host: 'any_host',
  port: 2525,
  auth: {
    user: 'any_user',
    pass: 'any_pass',
  },
};

let teste: IMailProvider;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    teste = new EtherealMailProvider(mailOptionsFake);
  });

  afterAll(async () => {
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
