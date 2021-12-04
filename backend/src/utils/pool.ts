import { Pool as PgPool, PoolConfig } from 'pg';
require('dotenv').config();

export default class Pool {
  private static instance: PgPool;

  private constructor() {}

  public static getInstance(): PgPool {
    if (!Pool.instance) {
      const opt: PoolConfig = {
        connectionString: process.env.DATABASE_URL,
        max: 500,
        min: 100,
        // ssl: {
        //   rejectUnauthorized: false
        // }
      };
      Pool.instance = new PgPool(opt);
    }
    return Pool.instance;
  }
}
