"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require('dotenv').config();
class Pool {
    constructor() { }
    static getInstance() {
        if (!Pool.instance) {
            const opt = {
                connectionString: process.env.DATABASE_URL,
                max: 500,
                min: 100,
                // ssl: {
                //   rejectUnauthorized: false
                // }
            };
            Pool.instance = new pg_1.Pool(opt);
        }
        return Pool.instance;
    }
}
exports.default = Pool;
//# sourceMappingURL=pool.js.map