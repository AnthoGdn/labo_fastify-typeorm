import { FastifyServerOptions, FastifyInstance } from 'fastify';

const TeamsController = (
    server: FastifyInstance,
    options: FastifyServerOptions,
    next: () => void
) => {
    server.get('/api/team/:year', {}, async (req, res) => {
        // @ts-ignore
        const year = req.params.year
        const team = await server.db.teams.findOne({ where: { year }, relations: ['players'] });
        if (team) {
            res.send({ team });
        } else {
            res.code(404).send()
        }
    });
    next();
};

export default TeamsController;
