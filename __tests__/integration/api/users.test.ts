import { connection, server } from '../../../@jest/setup';
import { User } from '../../../src/entities/user';

const PATH = '/api/users'

describe(`GET ${PATH}`, () => {
  test('returns empty array', async () => {
    const res = await server.inject({
      method: 'GET',
      url: PATH
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
      url: PATH
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
