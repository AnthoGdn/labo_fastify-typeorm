import { connection, server } from '../../../../@jest/setup';
import { Player } from '../../../../src/entities/player';
import { createTeam } from '../../../helpers/database/team';

const PATH = '/api/team';

describe(`GET ${PATH}/:year`, () => {
  test('returns 404 because there is not team in database for the year', async () => {
    const res = await server.inject({
      method: 'GET',
      url: `${PATH}/1`
    });

    expect(res.statusCode).toBe(404);
  });

  test('returns a team without player', async () => {
    const team = {
      id: 'aa3b13a7-ecd9-440b-abf3-ceca80b66683',
      coach: 'Marion Felix',
      year: 2021,
      players: []
    };
    await createTeam({ connection, team });

    const res = await server.inject({
      method: 'GET',
      url: `${PATH}/2021`
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toStrictEqual({
      team: team
    });
  });

  test('returns a team with one player', async () => {
    const player: Player = new Player(
      'aa3b13a7-ecd9-440b-abf3-ceca80b66683',
      1,
      'Anthony',
      'Godin',
      'defenseman',
      false
    );

    const team = {
      id: 'aa3b13a7-ecd9-440b-abf3-ceca80b66684',
      coach: 'Marion Felix',
      year: 2021,
      players: []
    };

    await createTeam({ connection, team, players: [player] });

    const res = await server.inject({
      method: 'GET',
      url: `${PATH}/2021`
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toStrictEqual({
      team: {
        ...team,
        players: [{ ...player }]
      }
    });
  });
});
