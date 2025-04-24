import mysql, { Pool } from 'mysql2/promise';

let pool: Pool;

export const getPool = (): Pool => {
  if (!pool) {
    pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'nuxt-app',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
};
