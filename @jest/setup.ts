import { beforeAll, beforeEach, afterEach, afterAll } from '@jest/globals'
import {Connection} from "typeorm";
import {FastifyInstance} from "fastify/types/instance";
import {getConnection} from "../src/plugins/db";
import {createServer} from "../src/server";

export let connection: Connection
export let server: FastifyInstance

export const clearDb = async (connection: Connection) => {
    const entities = connection.entityMetadatas

    for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        await repository.clear();
    }
}

beforeAll(async () => {
    connection = (await getConnection()).connection
    server = createServer({connection})
})

afterEach(async () => {
    await clearDb(connection)
})

afterAll(async () => {
    await connection.close()
    await server.close()
})