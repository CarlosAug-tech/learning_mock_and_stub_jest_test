import request from 'supertest';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';

import { Connection } from 'typeorm';

import createConnection from '@infra/database/typeorm';
import { app } from '@infra/http/app';

let connection: Connection;
let idUserGeneric: string;
let passwordUserGenericHash: string;

const saltHash = 12;
const user = {
  name: 'any_name',
  email: 'any_valid_mail@mail.com',
  password: 'any_valid_password',
};
describe('Authentication User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    idUserGeneric = v4();
    passwordUserGenericHash = await hash(user.password, saltHash);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, created_at)
    values('${idUserGeneric}', '${user.name}', '${user.email}', '${passwordUserGenericHash}', 'now()')
    `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to authenticate a User registred', async () => {
    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
