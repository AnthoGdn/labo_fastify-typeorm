import { Team } from '../../../../src/entities/team';
import { Player } from '../../../../src/entities/player';
import { connection } from '../../../../@jest/setup';
import { Connection } from 'typeorm';

type CreateTeam = (_: {
  connection: Connection;
  team: Team;
  players?: Player[];
}) => void;

export const createTeam: CreateTeam = async ({ connection, team, players }) => {
  await connection
    .createQueryBuilder()
    .insert()
    .into(Team)
    .values([team])
    .execute();

  if (players && players.length) {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Player)
      .values(players)
      .execute();

    await connection
      .createQueryBuilder()
      .relation(Team, 'players')
      .of(team.id)
      .add(players);
  }
};
