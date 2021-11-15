import { connection, server } from '../../../../@jest/setup';
import { createTeam } from '../../../helpers/database/teams';
import { Player } from '../../../../src/entities/player';
import { getPlayer } from '../../../helpers/database/players';

describe(`PUT a captain on a team:  /api/player/:id/captain`, () => {
  test('returns 404 because there is not the player in database', async () => {
    const id = 'aa3b13a7-ecd9-440b-abf3-ceca80b66683';
    const res = await server.inject({
      method: 'PUT',
      url: `/api/player/${id}/captain`
    });

    expect(res.statusCode).toBe(404);
  });

  test('returns the player', async () => {
    const playerId = 'aa3b13a7-ecd9-440b-abf3-ceca80b66683';

    const player: Player = new Player(
      playerId,
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
      method: 'PUT',
      url: `/api/player/${playerId}/captain`
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toStrictEqual({
      id: playerId,
      number: 1,
      name: 'Anthony',
      lastName: 'Godin',
      position: 'defenseman',
      isCaptain: true
    });
  });

  test('saves the player', async () => {
    const playerId = 'aa3b13a7-ecd9-440b-abf3-ceca80b66683';

    const player: Player = new Player(
      playerId,
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

    await server.inject({
      method: 'PUT',
      url: `/api/player/${playerId}/captain`
    });

    const editedPlayer = await getPlayer({ id: playerId });

    expect({ ...editedPlayer }).toStrictEqual({
      id: playerId,
      number: 1,
      name: 'Anthony',
      lastName: 'Godin',
      position: 'defenseman',
      isCaptain: true
    });
  });
});
