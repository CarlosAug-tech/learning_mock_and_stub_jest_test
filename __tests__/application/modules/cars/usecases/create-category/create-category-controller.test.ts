import request from 'supertest';
import { v4 } from 'uuid';
import { Connection } from 'typeorm';

import createConnection from '@infra/database/typeorm';
import { hash } from 'bcrypt';
import authConfig from '@infra/config/auth-config';
import { sign } from 'jsonwebtoken';
import { app } from '@infra/http/app';

let connection: Connection;
let idUserGeneric: string;
let passwordUserGenericHash: string;
let tokenUserGeneric: string;

const saltHash = 12;
const user = {
  name: 'any_name',
  email: 'any_valid_mail@mail.com',
  password: 'any_valid_password',
};

describe('Create Category Controller', () => {
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

    tokenUserGeneric = sign({}, authConfig.token_secret, {
      subject: idUserGeneric,
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'any_category',
      })
      .set({
        Authorization: `Bearer ${tokenUserGeneric}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
