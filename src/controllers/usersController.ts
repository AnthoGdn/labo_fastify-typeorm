import { FastifyServerOptions, FastifyInstance } from 'fastify';

const userController = (
  server: FastifyInstance,
  options: FastifyServerOptions,
  next: () => void
) => {
  server.get('/api/users', {}, async (req, res) => {
    req.log.info(`list inventory from db`);
    const users = await server.db.users.find();

    res.send({ users });
  });
  next();
};

export default userController;
