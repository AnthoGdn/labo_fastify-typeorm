import { connection, server } from '../../../@jest/setup';
import { User } from '../../../src/entities/user';

describe('GET /users', () => {
  test('returns one user 2', async () => {
    const uuid = 'aa3b13a7-ecd9-440b-abf3-ceca80b66684';
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: uuid,
          firstName: 'Antho',
          lastName: 'Godin'
        }
      ])
      .execute();

    const res = await server.inject({
      method: 'GET',
      url: '/users'
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toEqual({
      users: [
        {
          id: uuid,
          firstName: 'Antho',
          lastName: 'Godin'
        }
      ]
    });
  });

  test('returns empty array', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/users'
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toEqual({ users: [] });
  });

  test('returns one user', async () => {
    const uuid = 'aa3b13a7-ecd9-440b-abf3-ceca80b66683';
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: uuid,
          firstName: 'Anthony',
          lastName: 'Godin'
        }
      ])
      .execute();

    const res = await server.inject({
      method: 'GET',
      url: '/users'
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toEqual({
      users: [
        {
          id: uuid,
          firstName: 'Anthony',
          lastName: 'Godin'
        }
      ]
    });
  });
});
