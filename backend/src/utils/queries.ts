export const queries = {
  GET_USERS: `SELECT * FROM usuario`,
  GET_USER_BY_EMAIL: `SELECT * FROM usuario WHERE correo = $1`,
  GET_USER_BY_ID:`SELECT cedula, correo, usuario.nombre AS nombre, contrasenia, tipo_usuario.nombre AS tipoUsuario, escuela.nombre as escuela, facultad.nombre as facultad FROM usuario, tipo_usuario, escuela, facultad WHERE escuela.id_escuela=usuario.id_escuela AND facultad.id_facultad=escuela.id_facultad AND cedula=$1 AND usuario.id_tipo_usuario=tipo_usuario.id_tipo_usuario`,
  CHANGE_KEY:`UPDATE usuario SET contrasenia = $1 WHERE cedula = $2 RETURNING *`,
  INSERT_USER:`INSERT INTO usuario VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
};

export const queriesProyect = {
  GET_PROYECT:`SELECT titulo, descripcion, to_char(fecha_publicacion, 'DD/MM/YYYY HH24:MI') as fecha_publicacion, url_archivo, usuario.nombre as autor FROM archivo, usuario, autor WHERE archivo.id_archivo= $1 AND autor.id_archivo=archivo.id_archivo AND autor.cedula=usuario.cedula ORDER BY archivo.titulo`,
  GET_PROYECTS_RECENT:`SELECT titulo, to_char(fecha_publicacion, 'DD/MM/YYYY HH24:MI') as fecha_publicacion FROM archivo ORDER BY fecha_publicacion DESC LIMIT 3`,
  GET_PROYECT_FILTER:{
    BEGINNING:`SELECT archivo.id_archivo as id, archivo.titulo as titulo, escuela.nombre as escuela FROM archivo, escuela, autor, usuario`,
    END:` usuario.id_escuela=escuela.id_escuela AND usuario.cedula=autor.cedula AND autor.id_archivo=archivo.id_archivo and archivo.estado like 'Aprobado' ORDER BY archivo.fecha_publicacion ASC `
  },
  GET_PROYECTS_STATUS:`SELECT archivo.id_archivo as id, archivo.titulo as titulo, usuario.nombre as autor, archivo.estado as estado FROM archivo, autor, usuario WHERE usuario.cedula=autor.cedula AND autor.id_archivo=archivo.id_archivo and archivo.estado IN ('Revision', 'Espera') ORDER BY archivo.fecha_publicacion ASC`,
  GET_COMMENTS_PROYECTS:`SELECT nota_archivo.contenido, to_char(nota_archivo.fecha, 'DD/MM/YYYY HH24:MI') as fecha, usuario.nombre FROM usuario, nota_archivo WHERE nota_archivo.id_archivo = $1 AND nota_archivo.cedula = usuario.cedula ORDER BY nota_archivo.fecha DESC`,                          
  INSERT_PROYECT:`INSERT INTO archivo (titulo, descripcion, fecha_publicacion, estado) values($1,$2,now(),'Espera') RETURNING *`,
  DELETE_PROYECT:`DELETE FROM archivo WHERE id_archivo = $1`,
  UPDATE_STATE_PROYECT:`UPDATE archivo SET estado = $1 WHERE id_archivo=$2`,
  INSERT_AUTHORS:`INSERT INTO autor VALUES ($1, $2) RETURNING *`,
  COMMENT_PROYECT:`INSERT INTO nota_archivo (contenido, id_archivo, cedula) VALUES ($1, $2, $3) RETURNING *`,
  UPDATE_URL_PROYECT:`UPDATE archivo SET url_archivo = $1 WHERE id_archivo = $2`,
  GET_COMMENT_USER:`SELECT DISTINCT nota_archivo.id_archivo AS id, archivo.titulo AS titulo, escuela.nombre AS escuela FROM nota_archivo, archivo, escuela, autor, usuario where nota_archivo.cedula=$1 AND archivo.id_archivo=nota_archivo.id_archivo AND autor.id_archivo=archivo.id_archivo AND usuario.cedula=autor.cedula AND escuela.id_escuela = usuario.id_escuela`,
  GET_COMMENT_PROYECTS_USER:`SELECT DISTINCT nota_archivo.id_archivo AS id, archivo.titulo AS titulo, usuario.nombre AS nombre, nota_archivo.fecha as fecha FROM nota_archivo, archivo, autor, usuario where autor.cedula=$1 AND usuario.cedula=nota_archivo.cedula AND archivo.id_archivo=nota_archivo.id_archivo AND autor.id_archivo=archivo.id_archivo ORDER BY nota_archivo.fecha DESC LIMIT 4`
};

export const queriesMeeting = {
  GET_MEETING:`SELECT asunto, descripcion, to_char(fecha_inicio, 'DD/MM/YYYY HH24:MI') as fecha_inicio, to_char(fecha_fin, 'DD/MM/YYYY HH24:MI') as fecha_fin, cant_participantes, estado, cedula, current_timestamp >= fecha_inicio as inicio FROM reunion WHERE id_reunion = $1`,
  GET_LAST_MEETING:`SELECT asunto, to_char(fecha_fin, 'DD/MM/YYYY HH24:MI') as fecha_fin FROM reunion WHERE fecha_fin is not null ORDER BY fecha_fin DESC LIMIT 3`,
  GET_RECENT_MEETING:`SELECT asunto, to_char(fecha_inicio, 'DD/MM/YYYY HH24:MI') as fecha_inicio FROM reunion WHERE fecha_inicio >= current_timestamp ORDER BY fecha_inicio ASC LIMIT 3`,
  GET_MEETING_FILTER:{
    BEGINNING:`SELECT id_reunion as id, asunto, to_char(fecha_inicio, 'DD/MM/YYYY HH24:MI') as fecha_inicio FROM reunion WHERE estado IN ('Espere','Iniciado') `,
    END:` ORDER BY fecha_inicio DESC`
  },
  GET_MEETING_FILTER_PARTICIPATES:{
    BEGINNING:`SELECT reunion.id_reunion as id, asunto, to_char(fecha_inicio, 'DD/MM/YYYY HH24:MI') as fecha_inicio FROM reunion, participante WHERE participante.cedula = $1 AND reunion.id_reunion = participante.id_reunion AND estado IN ('Espere','Iniciado') `,
    END:` ORDER BY fecha_inicio DESC`
  },
  GET_COMMENTS_MEETING:`SELECT nota_reunion.contenido as contenido, to_char(nota_reunion.fecha, 'DD/MM/YYYY HH24:MI') as fecha, usuario.nombre as nombre FROM usuario, nota_reunion WHERE nota_reunion.id_reunion = $1 AND nota_reunion.cedula = usuario.cedula ORDER BY nota_reunion.fecha DESC`,
  INSERT_MEETING:`INSERT INTO reunion (asunto, descripcion, fecha_inicio, cedula) VALUES ($1, $2, $3, $4) RETURNING *`,
  CULMINATE_MEETING:`UPDATE reunion SET fecha_fin = now(), estado = 'Culminado' WHERE id_reunion = $1`,
  START_MEETING:`UPDATE reunion SET estado = 'Iniciado' WHERE id_reunion = $1`,
  INSERT_PARTICIPATES_MEETING:`INSERT INTO participante VALUES ($1, $2) RETURNING *`,
  COMMENT_MEETIG:`INSERT INTO nota_reunion (contenido, id_reunion, cedula) VALUES ($1, $2, $3) RETURNING *`,
  IS_PARTICIPANT:`SELECT * FROM participante WHERE id_reunion = $1 AND cedula = $2`,
  IS_ADMIN_MEETING:`SELECT * FROM reunion WHERE id_reunion = $1 AND cedula = $2`
}