import Pool from '@utils/pool';
import { queries } from '@utils/queries';
import { compare, genSaltSync, hashSync  } from 'bcryptjs';
import { UserComplete, RegisterUser } from '@interfaces/User';

const pool = Pool.getInstance();

export const getUserById = async (cedula: number): Promise<UserComplete> => {
  const client = await pool.connect();

  try {
    const response = (await client.query(queries.GET_USER_BY_ID, [cedula])).rows[0];
    console.log(response)
    const users: UserComplete= {
        cedula:response.cedula,
        nombre: response.nombre,
        correo: response.correo,
        clave: response.contrasenia,
        tipo_usuario:response.tipousuario,
        escuela:response.escuela,
        facultad:response.facultad
    }
    return users;
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};

export const insertUser= async(Usuario:RegisterUser): Promise<RegisterUser>=>{
  const client = await pool.connect();
  const {cedula, correo, nombre, tipo_usuario, escuela, clave}=Usuario;
  try {
    await client.query('BEGIN');
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(clave, salt);
    const response = (await client.query(queries.INSERT_USER, [cedula, correo, nombre, hashedPassword, tipo_usuario, escuela])).rows[0];
    console.log(response)
    const users: RegisterUser= {
        cedula:response.cedula,
        nombre: response.nombre,
        correo: response.correo,
        clave: response.contrasenia,
        tipo_usuario:response.id_tipo_usuario,
        escuela:response.id_escuela
    }
    await client.query('COMMIT');
    return users;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export const comparePassword = (candidate, hash) => {
  return new Promise((res, rej) => {
    compare(candidate, hash, (err, isMatch) => {
      if (err) rej(err);
      res(isMatch);
    });
  });
};
