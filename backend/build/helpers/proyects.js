"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStateProyect = exports.insertProyect = exports.getProyectFilter = exports.getProyectRecent = exports.getProyect = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const pool = pool_1.default.getInstance();
const getProyect = async (id) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesProyect.GET_PROYECT, [id])).rows;
        console.log(response);
        const proyect = {
            titulo: response[0].titulo,
            descripcion: response[0].descripcion,
            fecha_publicacion: response[0].fecha_publicacion,
            url_archivo: response[0].url_archivo,
            autores: response.map((rows) => {
                return rows.autor;
            })
        };
        return proyect;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getProyect = getProyect;
const getProyectRecent = async () => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesProyect.GET_PROYECTS_RECENT)).rows;
        console.log(response);
        const titles = response.map((rows) => {
            return rows.titulo;
        });
        return titles;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getProyectRecent = getProyectRecent;
const getProyectFilter = async ({ titulo, escuela, facultad }) => {
    const client = await pool.connect();
    const params = [];
    console.log(titulo ? params.push(titulo) : null);
    console.log(escuela ? params.push(escuela) : null);
    console.log(facultad ? params.push(facultad) : null);
    try {
        const response = (await client.query(queries_1.queriesProyect.GET_PROYECT_FILTER.BEGINNING + (facultad != '' ? `, facultad WHERE UPPER(facultad.nombre) like '%' || UPPER($${params.indexOf(facultad) + 1}) || '%' AND facultad.id_facultad=escuela.id_facultad AND` : ` WHERE `) +
            (escuela != '' ? ` UPPER(escuela.nombre) like '%' || UPPER($${params.indexOf(escuela) + 1}) || '%' AND ` : ` `) +
            (titulo != '' ? ` UPPER(archivo.titulo) like '%' || UPPER($${params.indexOf(titulo) + 1}) || '%' AND ` : ` `) +
            queries_1.queriesProyect.GET_PROYECT_FILTER.END, params)).rows;
        console.log(response);
        const proyects = response.map((rows) => {
            return {
                titulo: rows.titulo,
                escuela: rows.escuela
            };
        });
        return proyects;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getProyectFilter = getProyectFilter;
const insertProyect = async ({ titulo, descripcion, autor }) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesProyect.INSERT_PROYECT, [titulo, descripcion])).rows[0];
        console.log(response);
        const response2 = autor.map(async (rows) => {
            return (await client.query(queries_1.queriesProyect.INSERT_AUTHORS, [response.id_archivo, rows]));
        });
        console.log(response2);
        const proyects = {
            titulo: response.titulo,
            fecha_publicacion: response.fecha_publicacion,
            descripcion: response.descripcion
        };
        return proyects;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.insertProyect = insertProyect;
const updateStateProyect = async ({ id, estado }) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesProyect.UPDATE_STATE_PROYECT, [estado, id])).rowCount > 0;
        console.log(response);
        return response;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.updateStateProyect = updateStateProyect;
//# sourceMappingURL=proyects.js.map