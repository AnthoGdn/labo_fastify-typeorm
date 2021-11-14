import fastify from 'fastify';

import userController from './controllers/usersController';
import pingController from "./controllers/pingController";
import { Connection } from 'typeorm';
import db from './plugins/db';

export const createServer = ({ connection }: { connection: Connection }) => {
  const server = fastify();

  server.register(db, { connection });
  server.register(userController);
  server.register(pingController);

  return server;
};
