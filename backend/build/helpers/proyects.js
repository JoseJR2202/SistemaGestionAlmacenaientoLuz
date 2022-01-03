"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUrlProyect = exports.commentProyect = exports.updateStateProyect = exports.deleteProyect = exports.insertProyect = exports.getProyectStatus = exports.getProyectFilter = exports.getCommentsUser = exports.getCommentProyect = exports.getProyectRecent = exports.getProyect = void 0;
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
const getCommentProyect = async (id) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesProyect.GET_COMMENTS_PROYECTS, [id])).rows;
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
exports.getCommentProyect = getCommentProyect;
const getCommentsUser = async (CI) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesProyect.GET_COMMENT_USER, [CI])).rows;
        console.log(response);
        let result = [];
        const flags = [];
        response.forEach((row, index) => {
            if (!flags.includes(row.id)) {
                flags.push(row.id);
                result.push({
                    id: row.id,
                    titulo: row.titulo,
                    escuela: row.escuela
                });
            }
            else {
                result = result.map((rows) => {
                    if (row.id === rows.id) {
                        return ({
                            id: rows.id,
                            titulo: rows.titulo,
                            escuela: rows.escuela + ' / ' + row.escuela
                        });
                    }
                    return rows;
                });
            }
        });
        return result;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getCommentsUser = getCommentsUser;
const getProyectFilter = async ({ titulo, escuela, facultad }) => {
    const client = await pool.connect();
    const params = [];
    console.log(titulo ? params.push(titulo) : null);
    console.log(escuela ? params.push(escuela) : null);
    console.log(facultad ? params.push(facultad) : null);
    try {
        const response = (await client.query(queries_1.queriesProyect.GET_PROYECT_FILTER.BEGINNING + (facultad ? `, facultad WHERE UPPER(facultad.nombre) like '%' || UPPER($${params.indexOf(facultad) + 1}) || '%' AND facultad.id_facultad=escuela.id_facultad AND` : ` WHERE `) +
            (escuela ? ` UPPER(escuela.nombre) like '%' || UPPER($${params.indexOf(escuela) + 1}) || '%' AND ` : ` `) +
            (titulo ? ` UPPER(archivo.titulo) like '%' || UPPER($${params.indexOf(titulo) + 1}) || '%' AND ` : ` `) +
            queries_1.queriesProyect.GET_PROYECT_FILTER.END, params)).rows;
        console.log(response);
        const proyects = response.map((rows) => {
            return {
                id: rows.id,
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
const getProyectStatus = async () => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesProyect.GET_PROYECTS_STATUS)).rows;
        console.log(response);
        const proyectsStandby = response.filter((proyect) => proyect.estado === 'Espera').map((rows) => {
            return {
                id: rows.id,
                titulo: rows.titulo,
                autor: response.filter((proyect) => proyect.id === rows.id).map((row) => {
                    return row.autor;
                }),
                estado: rows.estado
            };
        });
        const proyectsRevision = response.filter((proyect) => proyect.estado === 'Revision').map((rows) => {
            return {
                id: rows.id,
                titulo: rows.titulo,
                autor: response.filter((proyect) => proyect.id === rows.id).map((row) => {
                    return row.autor;
                }),
                estado: rows.estado
            };
        });
        return {
            revision: proyectsRevision.filter((proyect, index) => {
                return proyectsRevision.length === index + 1 ? true : proyect.id !== proyectsRevision[index + 1].id;
            }),
            standby: proyectsStandby.filter((proyect, index) => {
                return proyectsStandby.length === index + 1 ? true : proyect.id !== proyectsStandby[index + 1].id;
            })
        };
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getProyectStatus = getProyectStatus;
const insertProyect = async ({ titulo, descripcion, autor }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesProyect.INSERT_PROYECT, [titulo, descripcion])).rows[0];
        console.log(response);
        const response2 = await autor.map((rows) => {
            return (client.query(queries_1.queriesProyect.INSERT_AUTHORS, [response.id_archivo, rows]));
        });
        console.log(response2);
        const proyects = {
            id_archivo: response.id_archivo,
            titulo: response.titulo,
            fecha_publicacion: response.fecha_publicacion,
            descripcion: response.descripcion
        };
        await client.query('COMMIT');
        return proyects;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
exports.insertProyect = insertProyect;
const deleteProyect = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesProyect.DELETE_PROYECT, [id])).rowCount > 0;
        console.log(response);
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
exports.deleteProyect = deleteProyect;
const updateStateProyect = async ({ id, estado }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesProyect.UPDATE_STATE_PROYECT, [estado, id])).rowCount > 0;
        console.log(response);
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        throw e;
    }
    finally {
        await client.query('ROLLBACK');
        client.release();
    }
};
exports.updateStateProyect = updateStateProyect;
const commentProyect = async ({ descripcion, id, cedula }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesProyect.COMMENT_PROYECT, [descripcion, id, cedula])).rows[0];
        console.log(response);
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        await client.query('ROLLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.commentProyect = commentProyect;
const updateUrlProyect = async ({ id, url }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesProyect.UPDATE_URL_PROYECT, [url, id])).rows[0];
        console.log(response);
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        await client.query('ROLLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.updateUrlProyect = updateUrlProyect;
//# sourceMappingURL=proyects.js.map