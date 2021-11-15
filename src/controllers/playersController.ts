import { FastifyServerOptions, FastifyInstance } from 'fastify';

const PlayersController = (
  server: FastifyInstance,
  options: FastifyServerOptions,
  next: () => void
) => {
  server.put<{ Params: { playerId: string } }>(
    '/api/player/:playerId/captain',
    {},
    async (req, res) => {
      const playerId = req.params.playerId;
      const player = await server.db.players.findOne({
        where: { id: playerId }
      });
      if (player) {
        const savedPlayer = await server.db.players.save({
          ...player,
          isCaptain: true
        });
        res.send(savedPlayer);
      } else {
        res.code(404).send();
      }
    }
  );

  next();
};

export default PlayersController;
