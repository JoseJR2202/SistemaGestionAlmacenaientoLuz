"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queriesProyect = exports.queries = void 0;
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
        FILTERS: {
            TITLE: ` UPPER(archivo.titulo) like '%' || UPPER($1) || '%' AND `,
            SCHOOL: ` UPPER(escuela.nombre) like '%' || UPPER($2) || '%' AND `,
            FACULTY: `, facultad WHERE UPPER(facultad.nombre) like '%' || UPPER($3) || '%' AND facultad.id_facultad=escuela.id_facultad AND`
        },
        END: ` usuario.id_escuela=escuela.id_escuela AND usuario.cedula=autor.cedula AND autor.id_archivo=archivo.id_archivo ORDER BY archivo.fecha_publicacion ASC`
    },
    INSERT_PROYECT: `INSERT INTO archivo (titulo, descripcion, fecha_publicacion, estado) values($1,$2,now(),'Espera') RETURNING *`,
    UPDATE_STATE_PROYECT: `UPDATE archivo SET estado = $1 WHERE id_archivo=$2 RETURNIGN *`,
    INSERT_AUTHORS: `INSERT INTO autor VALUES ($1, $2) RETURNING *`
};
//# sourceMappingURL=queries.js.map