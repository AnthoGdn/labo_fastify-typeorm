import { connection, server } from '../../../@jest/setup';
import { User } from '../../../src/entities/user';
import {Team} from "../../../src/entities/team";

const PATH = '/api/team'

describe(`GET ${PATH}/:year`, () => {
  test('returns unknown team', async () => {
    const res = await server.inject({
      method: 'GET',
      url: `${PATH}/1`
    });

    expect(res.statusCode).toBe(404);
  });

  test('returns a team with a player', async () => {
    const uuid = 'aa3b13a7-ecd9-440b-abf3-ceca80b66683';
    await connection
      .createQueryBuilder()
      .insert()
      .into(Team)
      .values([
        {
          id: uuid,
          coach: 'Marion Felix',
          year: 2021,
          players: []
        }
      ])
      .execute();

    const res = await server.inject({
      method: 'GET',
      url: `${PATH}/2021`
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toStrictEqual({
      team: {
        id: uuid,
        coach: 'Marion Felix',
        year: 2021,
        players: []
      }
    });
  });
});
