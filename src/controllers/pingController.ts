import { FastifyServerOptions, FastifyInstance } from 'fastify';

const pingController = (
  server: FastifyInstance,
  options: FastifyServerOptions,
  next: () => void
) => {
  server.get('/api/ping', {}, async (req, res) => {
    res.send({ status: 'ok' });
  });

  next();
};

export default pingController;
