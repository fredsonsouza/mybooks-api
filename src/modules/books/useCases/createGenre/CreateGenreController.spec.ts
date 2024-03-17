import { hash } from 'bcrypt';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import { createConnection } from '@shared/infra/typeorm/data-source';

let connection: DataSource;

describe('Create Genre Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    connection.query(
      `INSERT INTO USERS(id, name, password, email, registration_number, "isAdmin", created_at)
    values('${id}', 'admin', '${password}', 'adminmybooks@email.com', 'XXXXX', true, 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy().finally();
  });

  it('Should be able to create a new Genre', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'adminmybooks@email.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/genres')
      .send({
        name: 'Genre supertest',
        description: 'Description supertest',
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(201);
  });
});
