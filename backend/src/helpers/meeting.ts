import Pool from '@utils/pool';
import { queriesMeeting } from '@utils/queries';
import { meeting, listMeeting } from '@interfaces/Meeting';

const pool = Pool.getInstance();

export const getMeeting= async (id:number): Promise<meeting>=>{
    const client = await pool.connect();
    try {
      const response = (await client.query(queriesMeeting.GET_MEETING, [id])).rows[0];
      console.log(response)
      const meeting: meeting= {
        id_reunion:response.id_reunion,
        asunto:response.asunto,
        descripcion:response.descripcion,
        fecha_inicio:response.fecha_inicio,
        participantes:response.cant_participantes
      }
      return meeting;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
};

export const getCommentsMeeting= async (id:number)=>{
  const client = await pool.connect();
  try {
    const response = (await client.query(queriesMeeting.GET_COMMENTS_MEETING, [id])).rows;
    console.log(response)
    return response;
  } catch (e) {
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
};

export const getLastMeeting= async ():Promise<listMeeting[]>=>{
    const client = await pool.connect();
    try {
      const response = (await client.query(queriesMeeting.GET_LAST_MEETING)).rows;
      const lista:listMeeting[]=response.map((row)=>{
        return{
          asunto:row.asunto,
          fecha:row.fecha_fin
        }
      });
      return lista;
    } catch (e) {
      console.log(e)
      throw e;
    } finally {
      client.release();
    }
};

export const getRecentMeeting= async():Promise<listMeeting[]>=>{
    const client = await pool.connect();
    try {
      const response = (await client.query(queriesMeeting.GET_RECENT_MEETING)).rows;
      console.log(response)
      const lista:listMeeting[]=response.map((row)=>{
        return{
          asunto:row.asunto,
          fecha:row.fecha_inicio
        }
      });
      return lista;
    } catch (e) {
      console.log(e)
      throw e;
    } finally {
      client.release();
    }
};

export const getFilterMeeting= async({titulo, horario}:{titulo:string, horario:string})=>{
    const client = await pool.connect();
    try {
      const params:Object[]=[];
      console.log(titulo?params.push(titulo):null);
      console.log(horario?params.push(horario):null);
      console.log(queriesMeeting.GET_MEETING_FILTER.BEGINNING + (titulo?` AND UPPER(asunto) LIKE '%' || UPPER($${params.indexOf(titulo)+1}) || '%' `:` `)
      + (horario?` AND fecha_inicio::date = $${params.indexOf(horario)+1} `:` `)+ queriesMeeting.GET_MEETING_FILTER.END)
      const response = (await client.query(queriesMeeting.GET_MEETING_FILTER.BEGINNING + (titulo?` AND UPPER(asunto) LIKE '%' || UPPER($${params.indexOf(titulo)+1}) || '%' `:` `)
                        + (horario?` AND fecha_inicio::date = $${params.indexOf(horario)+1}`:` `)+ queriesMeeting.GET_MEETING_FILTER.END, params)).rows;
      return response;
    } catch (e) {
      console.log(e)
      throw e;
    } finally {
      client.release();
    }
};

//esta se podria fucionar con la anterior 
export const getFilterMeetingParticipates= async({titulo, horario, cedula}:{titulo:string, horario:string, cedula:number})=>{
  const client = await pool.connect();
  try {
    const params:Object[]=[cedula];
    console.log(titulo?params.push(titulo):null);
    console.log(horario?params.push(horario):null);
    console.log(queriesMeeting.GET_MEETING_FILTER_PARTICIPATES.BEGINNING + (titulo?` AND UPPER(asunto) LIKE '%' || UPPER($${params.indexOf(titulo)+1}) || '%' AND `:``) 
    + (horario?` AND fecha_inicio::date = $${params.indexOf(horario)+1}`:` `)+ queriesMeeting.GET_MEETING_FILTER_PARTICIPATES.END) 
    const response = (await client.query(queriesMeeting.GET_MEETING_FILTER_PARTICIPATES.BEGINNING + (titulo?` AND UPPER(asunto) LIKE '%' || UPPER($${params.indexOf(titulo)+1}) || '%' `:``) 
                      + (horario?` AND fecha_inicio::date = $${params.indexOf(horario)+1}`:` `)+ queriesMeeting.GET_MEETING_FILTER_PARTICIPATES.END, params)).rows;
    console.log(response)
    return response;
  } catch (e) {
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
};

export const insertMeeting= async({asunto, descripcion, fecha_inicio, invitados}:{asunto:string, descripcion:string, fecha_inicio:Date, invitados:number[]}):Promise<meeting>=>{
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queriesMeeting.INSERT_MEETING,[asunto, descripcion, fecha_inicio])).rows[0]; 
    console.log(response)
    invitados.map(async (rows)=>{
      const num:number=(await client.query(queriesMeeting.INSERT_PARTICIPATES_MEETING,[response.id_reunion,rows])).rows[0].cedula;
      return  num;
    })
    const meeting:meeting={
        asunto:response.asunto,
        fecha_inicio:response.fecha_inicio,
        descripcion:response.descripcion,
        participantes:invitados
    }
    await client.query('COMMIT');
    return meeting;
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
};

export const culminateMeeting = async(id:number)=>{
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queriesMeeting.CULMINATE_MEETING,[id])).rowCount>0; 
    console.log(response)
    await client.query('COMMIT');
    return response;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

export const commentMeeting = async ({descripcion, id, cedula}:{descripcion:string, id:number, cedula:number}) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queriesMeeting.COMMENT_MEETIG,[descripcion,id, cedula])).rows[0]; 
    console.log(response);
    await client.query('COMMIT');
    return response;
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

export const insertParticipates = async({id, cedula}:{id:number, cedula:number})=>{
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queriesMeeting.INSERT_PARTICIPATES_MEETING,[id, cedula])).rows[0]; 
    console.log(response)
    await client.query('COMMIT');
    return response;
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e)
    throw e;
  } finally {
    client.release();
  } 
}