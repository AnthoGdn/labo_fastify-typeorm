import { FastifyServerOptions, FastifyInstance } from 'fastify';

const TeamsController = (
    server: FastifyInstance,
    options: FastifyServerOptions,
    next: () => void
) => {
    server.get('/api/team/:year', {}, async (req, res) => {
        res.send({ team: {
            // @ts-ignore
            year: req.params.year
        }});
    });
    next();
};

export default TeamsController;
