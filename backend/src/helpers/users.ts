import Pool from '@utils/pool';
import { queries, queriesProyect } from '@utils/queries';
import { User } from '@interfaces/User';

const pool = Pool.getInstance();

export const updateKeyUser = async ({key, id}:{key:string, id:number}): Promise<User>=> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.CHANGE_KEY, [key, id])).rows[0];
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