"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.getUserById = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const bcryptjs_1 = require("bcryptjs");
const pool = pool_1.default.getInstance();
const getUserById = async (cedula) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queries.GET_USER_BY_ID, [cedula])).rows[0];
        console.log(response);
        const users = {
            cedula: response.cedula,
            nombre: response.nombre,
            correo: response.correo,
            clave: response.contrasenia,
            tipo_usuario: response.tipousuario,
            escuela: response.escuela
        };
        return users;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getUserById = getUserById;
const comparePassword = (candidate, hash) => {
    return new Promise((res, rej) => {
        (0, bcryptjs_1.compare)(candidate, hash, (err, isMatch) => {
            if (err)
                rej(err);
            res(isMatch);
        });
    });
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=session.js.map