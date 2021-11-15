import fastify from 'fastify';

import pingController from './controllers/pingController';
import userController from './controllers/usersController';
import teamsController from './controllers/teamsController';
import playersController from './controllers/playersController';
import { Connection } from 'typeorm';
import db from './plugins/db';

export const createServer = ({ connection }: { connection: Connection }) => {
  const server = fastify();

  server.register(db, { connection });
  server.register(pingController);
  server.register(userController);
  server.register(teamsController);
  server.register(playersController);

  return server;
};
