import { Knex } from 'knex';

export const knex = new Knex.Client({
  client: 'pg',
  connection: process.env['DB_URL'],
  pool: { min: 0, max: 20 },
  acquireConnectionTimeout: 10000,
  debug: process.env['DB_DEBUG'] === 'true',
});
