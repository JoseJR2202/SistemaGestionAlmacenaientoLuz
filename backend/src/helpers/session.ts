import Pool from '@utils/pool';
import { queries } from '@utils/queries';
import { compare } from 'bcryptjs';
import { UserComplete } from '@interfaces/User';

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

export const comparePassword = (candidate, hash) => {
  return new Promise((res, rej) => {
    compare(candidate, hash, (err, isMatch) => {
      if (err) rej(err);
      res(isMatch);
    });
  });
};
