import { connection, server } from '../../../@jest/setup';
import { User } from '../../../src/entities/user';
import { Team } from '../../../src/entities/team';
import { Player } from '../../../src/entities/player';

const PATH = '/api/team';

describe(`GET ${PATH}/:year`, () => {
  test('returns unknown team', async () => {
    const res = await server.inject({
      method: 'GET',
      url: `${PATH}/1`
    });

    expect(res.statusCode).toBe(404);
  });

  test('returns a team without player', async () => {
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

  test('returns a team with one player', async () => {
    const playerUuid = 'aa3b13a7-ecd9-440b-abf3-ceca80b66683';
    const teamUuid = 'aa3b13a7-ecd9-440b-abf3-ceca80b66684';

    const player = {
      id: playerUuid,
      name: 'Anthony Godin',
      lastName: 'Godin',
      number: 1,
      position: 'defenseman',
      isCaptain: false
    };

    const team = {
      id: teamUuid,
      coach: 'Marion Felix',
      year: 2021,
      players: []
    };

    await connection
      .createQueryBuilder()
      .insert()
      .into(Team)
      .values([team])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Player)
      .values([player])
      .execute();

    await connection
      .createQueryBuilder()
      .relation(Team, 'players')
      .of(teamUuid)
      .add(player);

    const res = await server.inject({
      method: 'GET',
      url: `${PATH}/2021`
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toStrictEqual({
      team: {
        id: teamUuid,
        coach: 'Marion Felix',
        year: 2021,
        players: [player]
      }
    });
  });
});
