import { connection, server } from '../../../../@jest/setup';
import { createTeam } from '../../../helpers/database/team';

const PATH = '/api/team';

describe(`POST a player on ${PATH}/:year`, () => {
  test('returns 404 because there is not team in database for the year', async () => {
    const res = await server.inject({
      method: 'POST',
      url: `${PATH}/1`,
      payload: {
        number: 99,
        name: 'Antonin',
        lastname: 'Bouscarel',
        position: 'forward',
        isCaptain: false
      }
    });

    expect(res.statusCode).toBe(404);
  });

  test('add a player in existing team', async () => {
    const team = {
      id: 'aa3b13a7-ecd9-440b-abf3-ceca80b66683',
      coach: 'Marion Felix',
      year: 2021,
      players: []
    };
    await createTeam({ connection, team });

    const player = {
      number: 99,
      name: 'Antonin',
      lastName: 'Bouscarel',
      position: 'forward',
      isCaptain: false
    };

    const res = await server.inject({
      method: 'POST',
      url: `${PATH}/2021`,
      payload: player
    });
    const { id, ...receivedPlayer } = JSON.parse(res.payload);

    expect(res.statusCode).toBe(200);
    expect(id).not.toBeNull();
    expect(receivedPlayer).toStrictEqual(player);
  });
});
