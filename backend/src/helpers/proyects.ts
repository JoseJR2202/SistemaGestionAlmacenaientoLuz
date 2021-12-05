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

export const getProyectFilter= async({titulo, escuela, facultad}:{titulo:string, escuela:string, facultad:string}) =>{
    const client = await pool.connect();
    const params:Object[]=[];
    console.log(titulo?params.push(titulo):null);
    console.log(escuela?params.push(escuela):null);
    console.log(facultad?params.push(facultad):null);
    try {
      const response = (await client.query(
        queriesProyect.GET_PROYECT_FILTER.BEGINNING+(facultad!=''? `, facultad WHERE UPPER(facultad.nombre) like '%' || UPPER($${params.indexOf(facultad)+1}) || '%' AND facultad.id_facultad=escuela.id_facultad AND`:` WHERE `)+
        (escuela!=''?` UPPER(escuela.nombre) like '%' || UPPER($${params.indexOf(escuela)+1}) || '%' AND `:` `)+
        (titulo!=''?` UPPER(archivo.titulo) like '%' || UPPER($${params.indexOf(titulo)+1}) || '%' AND `:` `)+
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
      const response = (await client.query(queriesProyect.INSERT_PROYECT,[titulo, descripcion])).rows[0]; 
      console.log(response)
      const response2= autor.map(async (rows)=>{
        return  (await client.query(queriesProyect.INSERT_AUTHORS,[response.id_archivo,rows]))
      })
      console.log(response2)
      const proyects:proyect={
          titulo:response.titulo,
          fecha_publicacion:response.fecha_publicacion,
          descripcion:response.descripcion
      }
      return proyects;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
};

export const updateStateProyect=async({id, estado}:{id:number, estado:string}): Promise<boolean>=>{
    const client = await pool.connect();
    try {
      const response = (await client.query(queriesProyect.UPDATE_STATE_PROYECT,[estado, id])).rowCount>0; 
      console.log(response)
      return response;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
};