"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertParticipates = exports.commentMeeting = exports.culminateMeeting = exports.insertMeeting = exports.getFilterMeetingParticipates = exports.getFilterMeeting = exports.getRecentMeeting = exports.getLastMeeting = exports.getCommentsMeeting = exports.getMeeting = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const pool = pool_1.default.getInstance();
const getMeeting = async (id) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesMeeting.GET_MEETING, [id])).rows[0];
        console.log(response);
        const meeting = {
            id_reunion: response.id_reunion,
            asunto: response.asunto,
            descripcion: response.descripcion,
            fecha_inicio: response.fecha_inicio,
            fecha_fin: response.fecha_fin,
            participantes: response.cant_participantes
        };
        return meeting;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getMeeting = getMeeting;
const getCommentsMeeting = async (id) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesMeeting.GET_COMMENTS_MEETING, [id])).rows;
        console.log(response);
        return response;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getCommentsMeeting = getCommentsMeeting;
const getLastMeeting = async () => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesMeeting.GET_LAST_MEETING)).rows;
        const lista = response.map((row) => {
            return {
                asunto: row.asunto,
                fecha: row.fecha_fin
            };
        });
        return lista;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getLastMeeting = getLastMeeting;
const getRecentMeeting = async () => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesMeeting.GET_RECENT_MEETING)).rows;
        console.log(response);
        const lista = response.map((row) => {
            return {
                asunto: row.asunto,
                fecha: row.fecha_inicio
            };
        });
        return lista;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getRecentMeeting = getRecentMeeting;
const getFilterMeeting = async ({ titulo, horario }) => {
    const client = await pool.connect();
    try {
        const params = [];
        console.log(titulo ? params.push(titulo) : null);
        console.log(horario ? params.push(horario) : null);
        console.log(queries_1.queriesMeeting.GET_MEETING_FILTER.BEGINNING + (titulo ? ` AND UPPER(asunto) LIKE '%' || UPPER($${params.indexOf(titulo) + 1}) || '%' ` : ` `)
            + (horario ? ` AND fecha_inicio::date = $${params.indexOf(horario) + 1} ` : ` `) + queries_1.queriesMeeting.GET_MEETING_FILTER.END);
        const response = (await client.query(queries_1.queriesMeeting.GET_MEETING_FILTER.BEGINNING + (titulo ? ` AND UPPER(asunto) LIKE '%' || UPPER($${params.indexOf(titulo) + 1}) || '%' ` : ` `)
            + (horario ? ` AND fecha_inicio::date = $${params.indexOf(horario) + 1}` : ` `) + queries_1.queriesMeeting.GET_MEETING_FILTER.END, params)).rows;
        return response;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getFilterMeeting = getFilterMeeting;
//esta se podria fucionar con la anterior 
const getFilterMeetingParticipates = async ({ titulo, horario, cedula }) => {
    const client = await pool.connect();
    try {
        const params = [cedula];
        console.log(titulo ? params.push(titulo) : null);
        console.log(horario ? params.push(horario) : null);
        console.log(queries_1.queriesMeeting.GET_MEETING_FILTER_PARTICIPATES.BEGINNING + (titulo ? ` AND UPPER(asunto) LIKE '%' || UPPER($${params.indexOf(titulo) + 1}) || '%' AND ` : ``)
            + (horario ? ` AND fecha_inicio::date = $${params.indexOf(horario) + 1}` : ` `) + queries_1.queriesMeeting.GET_MEETING_FILTER_PARTICIPATES.END);
        const response = (await client.query(queries_1.queriesMeeting.GET_MEETING_FILTER_PARTICIPATES.BEGINNING + (titulo ? ` AND UPPER(asunto) LIKE '%' || UPPER($${params.indexOf(titulo) + 1}) || '%' ` : ``)
            + (horario ? ` AND fecha_inicio::date = $${params.indexOf(horario) + 1}` : ` `) + queries_1.queriesMeeting.GET_MEETING_FILTER_PARTICIPATES.END, params)).rows;
        console.log(response);
        return response;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getFilterMeetingParticipates = getFilterMeetingParticipates;
const insertMeeting = async ({ asunto, descripcion, fecha_inicio, invitados }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesMeeting.INSERT_MEETING, [asunto, descripcion, fecha_inicio])).rows[0];
        console.log(response);
        invitados.map(async (rows) => {
            const num = (await client.query(queries_1.queriesMeeting.INSERT_PARTICIPATES_MEETING, [response.id_reunion, rows])).rows[0].cedula;
            return num;
        });
        const meeting = {
            asunto: response.asunto,
            fecha_inicio: response.fecha_inicio,
            descripcion: response.descripcion,
            participantes: invitados
        };
        await client.query('COMMIT');
        return meeting;
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
exports.insertMeeting = insertMeeting;
const culminateMeeting = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesMeeting.CULMINATE_MEETING, [id])).rowCount > 0;
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
exports.culminateMeeting = culminateMeeting;
const commentMeeting = async ({ descripcion, id, cedula }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesMeeting.COMMENT_MEETIG, [descripcion, id, cedula])).rows[0];
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
exports.commentMeeting = commentMeeting;
const insertParticipates = async ({ id, cedula }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesMeeting.INSERT_PARTICIPATES_MEETING, [id, cedula])).rows[0];
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
exports.insertParticipates = insertParticipates;
//# sourceMappingURL=meeting.js.map