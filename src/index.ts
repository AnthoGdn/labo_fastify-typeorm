import { createServer } from './server';
import { getConnection } from './plugins/db';

getConnection().then(({ connection, connectionOptions }) => {
  const server = createServer({ connection });
  console.log(`Connecting to database: ${connectionOptions.type}`);
  console.log('Database connected');

  server.listen(8080, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
});
