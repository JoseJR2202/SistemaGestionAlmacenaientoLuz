"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKeyUser = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const bcryptjs_1 = require("bcryptjs");
const pool = pool_1.default.getInstance();
const updateKeyUser = async ({ key, id }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        const hashedPassword = (0, bcryptjs_1.hashSync)(key, salt);
        const response = (await client.query(queries_1.queries.CHANGE_KEY, [hashedPassword, id])).rows[0];
        const user = {
            nombre: response.nombre,
            correo: response.correo,
            cedula: response.cedula,
        };
        await client.query('COMMIT');
        return user;
    }
    catch (e) {
        client.query('ROLLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.updateKeyUser = updateKeyUser;
//# sourceMappingURL=users.js.map