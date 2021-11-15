import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import { User } from '../entities/user';
import { ServerDb } from '../@types/fastify';
import { Team } from '../entities/team';
import { Player } from '../entities/player';

export const getConnection = async () => {
  const connectionOptions = await getConnectionOptions();
  Object.assign(connectionOptions, {
    options: { encrypt: true },
    entities: [User, Team, Player]
  });

  const connection = await createConnection(connectionOptions);

  return {
    connectionOptions,
    connection
  };
};

export default fp(
  async (
    server: FastifyInstance,
    { connection }: { connection: Connection }
  ) => {
    try {
      const db: ServerDb = {
        users: connection.getRepository(User),
        teams: connection.getRepository(Team),
        players: connection.getRepository(Player)
      };

      server.decorate('db', db);
    } catch (error) {
      console.log(error);
    }
  }
);
