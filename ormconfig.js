const isTestEnv = () => process.env.NODE_ENV === 'test'

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: isTestEnv() ? 5433 : 5432,
  username: 'admin',
  password: 'admin',
  database: isTestEnv() ? 'test' : 'dev',
  synchronize: true,
  dropSchema: isTestEnv(),
  logging: false,
  cache: false,
  entities: [
    'src/entity/**/*.ts'
  ],
  migrations: [
    'src/migration/**/*.ts'
  ],
  subscribers: [
    'src/subscriber/**/*.ts'
  ],
  cli: {
    'entitiesDir': 'src/entity',
    'migrationsDir': 'src/migration',
    'subscribersDir': 'src/subscriber'
  }
}