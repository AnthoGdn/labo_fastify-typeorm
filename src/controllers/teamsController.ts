import { FastifyServerOptions, FastifyInstance } from 'fastify';

const bodyJsonSchema = {
  type: 'object',
  required: ['number', 'name', 'lastName', 'position', 'isCaptain'],
  properties: {
    number: { type: 'number' },
    name: { type: 'string' },
    lastName: { type: 'string' },
    position: { type: 'string' },
    isCaptain: { type: 'boolean' }
  }
};

const opts = {
  schema: {
    body: bodyJsonSchema
  }
};

const TeamsController = (
  server: FastifyInstance,
  options: FastifyServerOptions,
  next: () => void
) => {
  server.get<{ Params: { year: string } }>(
    '/api/team/:year',
    {},
    async (req, res) => {
      const year = req.params.year;
      const team = await server.db.teams.findOne({
        where: { year },
        relations: ['players']
      });
      if (team) {
        res.send({ team });
      } else {
        res.code(404).send();
      }
    }
  );

  server.post<{ Params: { year: string } }>(
    '/api/team/:year',
    opts,
    async (req, res) => {
      const year = req.params.year;
      const team = await server.db.teams.findOne({
        where: { year },
        relations: ['players']
      });

      if (team) {
        const playerToAdd = req.body;
        const savedPlayer = await server.db.players.save(playerToAdd);
        await server.db.teams.save({
          ...team,
          players: [...team.players, savedPlayer]
        });

        res.send(savedPlayer);
      } else {
        res.code(404).send();
      }
    }
  );
  next();
};

export default TeamsController;
