"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.insertUser = exports.getUserById = void 0;
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
            escuela: response.escuela,
            facultad: response.facultad
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
const insertUser = async (Usuario) => {
    const client = await pool.connect();
    const { cedula, correo, nombre, tipo_usuario, escuela, clave } = Usuario;
    try {
        await client.query('BEGIN');
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        const hashedPassword = (0, bcryptjs_1.hashSync)(clave, salt);
        const response = (await client.query(queries_1.queries.INSERT_USER, [cedula, correo, nombre, hashedPassword, tipo_usuario, escuela])).rows[0];
        console.log(response);
        const users = {
            cedula: response.cedula,
            nombre: response.nombre,
            correo: response.correo,
            clave: response.contrasenia,
            tipo_usuario: response.id_tipo_usuario,
            escuela: response.id_escuela
        };
        await client.query('COMMIT');
        return users;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
exports.insertUser = insertUser;
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