import Pool from '@utils/pool';
import { queries } from '@utils/queries';
import { User } from '@interfaces/User';
import { compare, genSaltSync, hashSync  } from 'bcryptjs';

const pool = Pool.getInstance();

export const updateKeyUser = async ({key, id}:{key:string, id:number}): Promise<User>=> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(key, salt);
    const response = (await client.query(queries.CHANGE_KEY, [hashedPassword, id])).rows[0];
    const user: User = {
      nombre: response.nombre,
      correo: response.correo,
      cedula: response.cedula,
    };
    await client.query('COMMIT');
    return user;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};