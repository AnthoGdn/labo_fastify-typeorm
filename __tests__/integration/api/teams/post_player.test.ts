import { connection, server } from '../../../../@jest/setup';
import { createTeam, getTeam } from '../../../helpers/database/teams';
import { PlayerToSaveDTO } from '../../../../src/dto/player';

const PATH = '/api/team';

type IsPlayerSavedInTeamRepository = (_: {
  player: PlayerToSaveDTO;
  teamYear: number;
}) => void;
const isPlayerSavedInTeamRepository: IsPlayerSavedInTeamRepository = async ({
  player,
  teamYear
}) => {
  const savedTeam = await getTeam({ year: teamYear });
  const savedPlayers = savedTeam?.players;
  if (savedTeam && savedPlayers) {
    const savedPlayer = savedPlayers.find(
      (playerIterator) => playerIterator.number === player.number
    );

    if (!savedPlayer) {
      expect(savedPlayer).not.toBeNull();
    } else {
      const { id, ...rest } = savedPlayer;

      expect(id).not.toBeNull();
      expect(rest).toStrictEqual(player);
    }
  } else {
    expect(savedTeam).not.toBeNull();
    expect(savedPlayers).not.toBeNull();
  }
};

describe(`POST a player on ${PATH}/:year`, () => {
  test('returns 404 because there is not team in database for the year', async () => {
    const player: PlayerToSaveDTO = {
      number: 99,
      name: 'Antonin',
      lastName: 'Bouscarel',
      position: 'forward',
      isCaptain: false
    };

    const res = await server.inject({
      method: 'POST',
      url: `${PATH}/1`,
      payload: player
    });

    expect(res.statusCode).toBe(404);
  });

  test('returns 400 because it misses number in the player dto', async () => {
    const team = {
      id: 'aa3b13a7-ecd9-440b-abf3-ceca80b66683',
      coach: 'Marion Felix',
      year: 2021,
      players: []
    };
    await createTeam({ connection, team });

    const player = {
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

    expect(res.statusCode).toBe(400);
  });

  test('returns 400 because it misses name in the player dto', async () => {
    const team = {
      id: 'aa3b13a7-ecd9-440b-abf3-ceca80b66683',
      coach: 'Marion Felix',
      year: 2021,
      players: []
    };
    await createTeam({ connection, team });

    const player = {
      number: 99,
      lastName: 'Bouscarel',
      position: 'forward',
      isCaptain: false
    };

    const res = await server.inject({
      method: 'POST',
      url: `${PATH}/2021`,
      payload: player
    });

    expect(res.statusCode).toBe(400);
  });

  test('returns 400 because it misses lastName in the player dto', async () => {
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
      position: 'forward',
      isCaptain: false
    };

    const res = await server.inject({
      method: 'POST',
      url: `${PATH}/2021`,
      payload: player
    });

    expect(res.statusCode).toBe(400);
  });

  test('returns 400 because it misses position in the player dto', async () => {
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
      isCaptain: false
    };

    const res = await server.inject({
      method: 'POST',
      url: `${PATH}/2021`,
      payload: player
    });

    expect(res.statusCode).toBe(400);
  });

  test('returns 400 because it misses isCaptain in the player dto', async () => {
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
      position: 'forward'
    };

    const res = await server.inject({
      method: 'POST',
      url: `${PATH}/2021`,
      payload: player
    });

    expect(res.statusCode).toBe(400);
  });

  test('add a player in existing team and returns the player', async () => {
    const team = {
      id: 'aa3b13a7-ecd9-440b-abf3-ceca80b66683',
      coach: 'Marion Felix',
      year: 2021,
      players: []
    };
    await createTeam({ connection, team });

    const player: PlayerToSaveDTO = {
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

  test('add a player in existing team and saves the player', async () => {
    const year = 2021;
    const team = {
      id: 'aa3b13a7-ecd9-440b-abf3-ceca80b66683',
      coach: 'Marion Felix',
      year,
      players: []
    };
    await createTeam({ connection, team });

    const player: PlayerToSaveDTO = {
      number: 99,
      name: 'Antonin',
      lastName: 'Bouscarel',
      position: 'forward',
      isCaptain: false
    };

    await server.inject({
      method: 'POST',
      url: `${PATH}/2021`,
      payload: player
    });

    await isPlayerSavedInTeamRepository({ player, teamYear: year });
  });
});
