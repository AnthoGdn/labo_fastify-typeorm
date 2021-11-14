import { User } from '../entities/user';
import { Repository } from 'typeorm';

export type ServerDb = {
  users: Repository<User>;
  teams: Repository<Team>;
  players: Repository<Players>;
};

declare module 'fastify' {
  export interface FastifyInstance {
    db: ServerDb;
  }
}
