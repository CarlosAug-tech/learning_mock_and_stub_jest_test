import request from 'supertest';
import { sign } from 'jsonwebtoken';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';
import { Connection } from 'typeorm';

import createConnection from '@infra/database/typeorm';
import authConfig from '@infra/config/auth-config';
import { app } from '@infra/http/app';

let connection: Connection;
let idUserGeneric: string;
let idCategoryGeneric: string;
let passwordUserGenericHash: string;
let tokenUserGeneric: string;

const saltHash = 12;
const user = {
  name: 'any_name',
  email: 'any_valid_mail@mail.com',
  password: 'any_valid_password',
};
const category = {
  name: 'any_category',
};

describe('Create Car Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    idUserGeneric = v4();
    idCategoryGeneric = v4();
    passwordUserGenericHash = await hash(user.password, saltHash);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, created_at)
    values('${idUserGeneric}', '${user.name}', '${user.email}', '${passwordUserGenericHash}', 'now()')
    `,
    );

    await connection.query(
      `INSERT INTO CATEGORIES(id, name, created_at)
    values('${idCategoryGeneric}', '${category.name}', 'now()')
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

  it('should be able to create a new Car', async () => {
    const response = await request(app)
      .post('/cars')
      .send({
        name: 'any_name_car',
        description: 'any_description_car',
        brand: 'any_brand_car',
        category_id: idCategoryGeneric,
        user_id: idUserGeneric,
      })
      .set({
        Authorization: `Bearer ${tokenUserGeneric}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
