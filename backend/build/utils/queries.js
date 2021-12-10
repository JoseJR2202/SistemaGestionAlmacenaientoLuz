"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queriesMeeting = exports.queriesProyect = exports.queries = void 0;
exports.queries = {
    GET_USERS: `SELECT * FROM usuario`,
    GET_USER_BY_EMAIL: `SELECT * FROM usuario WHERE correo = $1`,
    GET_USER_BY_ID: `SELECT cedula, correo, usuario.nombre AS nombre, contrasenia, tipo_usuario.nombre AS tipoUsuario FROM usuario, tipo_usuario WHERE cedula=$1 AND usuario.id_tipo_usuario=tipo_usuario.id_tipo_usuario;`,
    CHANGE_KEY: `UPDATE usuario SET contrasenia = $1 WHERE cedula = $2 RETURNING *`
};
exports.queriesProyect = {
    GET_PROYECT: `SELECT archivo.*, usuario.nombre as autor FROM archivo, usuario, autor WHERE archivo.id_archivo= $1 AND autor.id_archivo=archivo.id_archivo AND autor.cedula=usuario.cedula ORDER BY archivo.titulo`,
    GET_PROYECTS_RECENT: `SELECT titulo FROM archivo ORDER BY fecha_publicacion ASC LIMIT 3`,
    GET_PROYECT_FILTER: {
        BEGINNING: `SELECT archivo.titulo as titulo, escuela.nombre as escuela FROM archivo, escuela, autor, usuario`,
        END: ` usuario.id_escuela=escuela.id_escuela AND usuario.cedula=autor.cedula AND autor.id_archivo=archivo.id_archivo and archivo.estado like 'Aprobado' ORDER BY archivo.fecha_publicacion ASC `
    },
    GET_COMMENTS_PROYECTS: `SELECT nota_archivo.contenido, to_char(nota_archivo.fecha, 'DD/MM/YYYY HH24:MI') as fecha, usuario.nombre FROM usuario, nota_archivo WHERE nota_archivo.id_archivo = $1 AND nota_archivo.cedula = usuario.cedula ORDER BY nota_archivo.fecha ASC`,
    INSERT_PROYECT: `INSERT INTO archivo (titulo, descripcion, fecha_publicacion, estado) values($1,$2,now(),'Espera') RETURNING *`,
    UPDATE_STATE_PROYECT: `UPDATE archivo SET estado = $1 WHERE id_archivo=$2`,
    INSERT_AUTHORS: `INSERT INTO autor VALUES ($1, $2) RETURNING *`,
    COMMENT_PROYECT: `INSERT INTO nota_archivo (contenido, id_archivo, cedula) VALUES ($1, $2, $3) RETURNING *`,
    UPDATE_URL_PROYECT: `UPDATE archivo SET url_archivo = $1 WHERE id_archivo = $2`
};
exports.queriesMeeting = {
    GET_MEETING: `SELECT * FROM reunion WHERE id_reunion = $1`,
    GET_LAST_MEETING: `SELECT asunto, fecha_fin FROM reunion ORDER BY fecha_fin DESC LIMIT 3`,
    GET_RECENT_MEETING: `SELECT asunto, fecha_inicio FROM reunion ORDER BY fecha_inicio DESC LIMIT 3`,
    GET_MEETING_FILTER: {
        BEGINNING: `SELECT asunto, fecha_inicio FROM reunion WHERE estado like 'Espera' `,
        END: ` ORDER BY fecha_inicio DESC`
    },
    GET_MEETING_FILTER_PARTICIPATES: {
        BEGINNING: `SELECT asunto, fecha_inicio FROM reunion, participante WHERE participante.cedula = $1 AND reunion.id_reunion = participante.id_reunion AND estado like 'Espera' `,
        END: ` ORDER BY fecha_inicio DESC`
    },
    GET_COMMENTS_MEETING: `SELECT nota_reunion.contenido, to_char(nota_reunion.fecha, 'DD/MM/YYYY HH24:MI') as fecha, usuario.nombre FROM usuario, nota_reunion WHERE nota_reunion.id_reunion = $1 AND nota_reunion.cedula = usuario.cedula ORDER BY nota_reunion.fecha ASC`,
    INSERT_MEETING: `INSERT INTO reunion (asunto, descripcion, fecha_inicio) VALUES ($1, $2, $3) RETURNING *`,
    CULMINATE_MEETING: `UPDATE reunion SET fecha_fin = now(), estado = 'Culminado' WHERE id_reunion = $1`,
    INSERT_PARTICIPATES_MEETING: `INSERT INTO participante VALUES ($1, $2) RETURNING *`,
    COMMENT_MEETIG: `INSERT INTO nota_reunion (contenido, id_reunion, cedula) VALUES ($1, $2, $3) RETURNING *`
};
//# sourceMappingURL=queries.js.map