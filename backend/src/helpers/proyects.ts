import Pool from '@utils/pool';
import { queriesProyect } from '@utils/queries';
import { proyect, detailProyect, proyectFilter } from '@interfaces/Proyect';

const pool = Pool.getInstance();

export const getProyect= async (id:number): Promise<detailProyect>=>{
    const client = await pool.connect();
    try {
      const response = (await client.query(queriesProyect.GET_PROYECT, [id])).rows;
      console.log(response)
      const proyect: detailProyect= {
         titulo:response[0].titulo,
         descripcion:response[0].descripcion,
         fecha_publicacion:response[0].fecha_publicacion,
         url_archivo:response[0].url_archivo,
         autores:response.map((rows)=>{
             return rows.autor
         })
      }
      return proyect;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
};

export const getProyectRecent=async (): Promise<string[]>=>{
    const client = await pool.connect();
    try {
      const response = (await client.query(queriesProyect.GET_PROYECTS_RECENT)).rows;
      console.log(response)
      const titles:string[]=response.map((rows)=>{
          return rows.titulo
      })
      return titles;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
};

export const getCommentProyect=async (id:number)=>{
  const client = await pool.connect();
  try {
    const response = (await client.query(queriesProyect.GET_COMMENTS_PROYECTS, [id])).rows;
    console.log(response)
    return response;
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};

export const getCommentsUser= async(CI:number)=>{
  const client = await pool.connect();
  try {
    const response = (await client.query(queriesProyect.GET_COMMENT_USER, [CI])).rows;
    console.log(response)
    let result:any[]=[];
    const flags:number[]=[];
    response.forEach((row, index)=>{
      if(!flags.includes(row.id)){
        flags.push(row.id);
        result.push({
          id:row.id,
          titulo:row.titulo,
          escuela:row.escuela
        })
      }
      else {
        result=result.map((rows)=>{
          if(row.id===rows.id){
            return({
              id:rows.id,
              titulo:rows.titulo,
              escuela:rows.escuela + ' / '+row.escuela
            })
          }
          return rows;
        })
      }
    });
    return result;
  } catch (e) {
    console.log(e)
    throw e;
  } finally {
    client.release();
  }
}

export const getProyectFilter= async({titulo, escuela, facultad}:{titulo:string, escuela:string, facultad:string}) =>{
    const client = await pool.connect();
    const params:Object[]=[];
    console.log(titulo?params.push(titulo):null);
    console.log(escuela?params.push(escuela):null);
    console.log(facultad?params.push(facultad):null);
    try {
      const response = (await client.query(
        queriesProyect.GET_PROYECT_FILTER.BEGINNING+(facultad? `, facultad WHERE UPPER(facultad.nombre) like '%' || UPPER($${params.indexOf(facultad)+1}) || '%' AND facultad.id_facultad=escuela.id_facultad AND`:` WHERE `)+
        (escuela?` UPPER(escuela.nombre) like '%' || UPPER($${params.indexOf(escuela)+1}) || '%' AND `:` `)+
        (titulo?` UPPER(archivo.titulo) like '%' || UPPER($${params.indexOf(titulo)+1}) || '%' AND `:` `)+
        queriesProyect.GET_PROYECT_FILTER.END,params)).rows;
      
      console.log(response)
      const proyects:proyectFilter[]=response.map((rows)=>{
          return{
              titulo:rows.titulo,
              escuela:rows.escuela
          }
      })
      return proyects;
    } catch (e) {
      console.log(e)
      throw e;
    } finally {
      client.release();
    }
};

export const insertProyect=async({titulo, descripcion, autor}:{ titulo:string, descripcion:string, autor:number[]}):Promise<proyect>=>{
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const response = (await client.query(queriesProyect.INSERT_PROYECT,[titulo, descripcion])).rows[0]; 
      console.log(response)
      const response2= await autor.map((rows)=>{
        return (client.query(queriesProyect.INSERT_AUTHORS,[response.id_archivo,rows]))
      })
      console.log(response2)
      const proyects:proyect={
          titulo:response.titulo,
          fecha_publicacion:response.fecha_publicacion,
          descripcion:response.descripcion
      }
      await client.query('COMMIT');
      return proyects;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
};

export const updateStateProyect=async({id, estado}:{id:number, estado:string}): Promise<boolean>=>{
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const response = (await client.query(queriesProyect.UPDATE_STATE_PROYECT,[estado, id])).rowCount>0; 
      console.log(response)
      await client.query('COMMIT');
      return response;
    } catch (e) {
      throw e;
    } finally {
      await client.query('ROLLBACK');
      client.release();
    }
};

export const commentProyect = async ({descripcion, id, cedula}:{descripcion:string, id:number, cedula:number}) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queriesProyect.COMMENT_PROYECT,[descripcion,id, cedula])).rows[0]; 
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

export const updateUrlProyect = async({id, url}:{id:number, url:string}):Promise<boolean>=>{
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queriesProyect.UPDATE_URL_PROYECT,[url,id])).rows[0]; 
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
}