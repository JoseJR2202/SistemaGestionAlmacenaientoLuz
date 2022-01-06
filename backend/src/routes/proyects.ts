import { Router } from 'express';
import { proyectFieldsValidation, searchProyectFieldsValidation, checkResult } from '@validations/fields';
import { proyect, detailProyect, proyectFilter } from '@interfaces/Proyect';
import { getProyectRecent, getProyect, getProyectFilter, insertProyect, updateStateProyect, getCommentProyect, commentProyect, updateUrlProyect, getCommentsUser, getProyectStatus, deleteProyect, getCommentProyectByUser } from '@helpers/proyects';
import multer from 'multer';
import multerconfig from '@utils/multer';
import fs from 'fs/promises';
import { isValidate, isAdmin } from '@validations/auth';

const uploads= multer(multerconfig);
const router = Router();

router.get('/recent', async (req, res) => {
  try {
    const data:object[]= await getProyectRecent();
    res.status(200).json({ status: 200, proyecto: data, message: 'Proyectos recientes enviados' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
  }
});

router.get('/:id', async(req, res)=>{
  try {
    const data:detailProyect= await getProyect(+req.params.id);
    res.status(200).json({ status: 200, proyecto: data, message: 'Datos del proyecto enviado correctamente' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
  }
});

router.delete('/:id', isAdmin, async(req, res)=>{
  try {
    // const proyect:detailProyect= await getProyect(+req.params.id);
    const data:boolean= await deleteProyect(+req.params.id);
    // if(data && proyect.url_archivo){
    //   await fs.unlink(`../uploads/${proyect.url_archivo}`);
    //   console.log('borrado');
    // }
    res.status(200).json({ status: 200, proyecto: data, message: 'Datos del proyecto borrados correctamente' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
  }
});

router.post('/state', isAdmin, async(req, res)=>{
  try {
    const data= await getProyectStatus();
    res.status(200).json({ status: 200, proyecto: data, message: 'Datos de los proyectos enviados correctamente' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
  }
});

router.get('/comments/:id', async(req, res)=>{
  try {
      const data= await getCommentProyect(+req.params.id);
      res.status(200).json({ status: 200, comment: data, message: 'comentarios enviados' });
  } catch (e) {
      res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
  }
});

router.post('/comments/user', async(req:any, res)=>{
  try {
      console.log(req.user.cedula)
      const data= await getCommentsUser(req.user.cedula);
      res.status(200).json({ status: 200, comments: data, message: 'comentarios enviados' });
  } catch (e) {
      res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
  }
});

router.get('/comments/user/proyects', isValidate, async(req:any, res)=>{
  try {
      console.log(req.user.cedula)
      const data= await getCommentProyectByUser(req.user.cedula);
      res.status(200).json({ status: 200, comments: data, message: 'comentarios enviados' });
  } catch (e) {
      res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
  }
});

router.post('/filter', searchProyectFieldsValidation, checkResult,async(req, res)=>{
  try {
    const {titulo, escuela, facultad} = req.body;
    console.log(titulo, escuela, facultad)
    const data= await getProyectFilter({titulo:titulo, escuela:escuela, facultad:facultad})
    res.status(200).json({ status: 200, data: data, message: 'Proyectos filtrados correctamente' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
  }
});

router.post('/', isValidate, proyectFieldsValidation, checkResult,async(req, res)=>{
    try {
        const {titulo, descripcion, autores} = req.body;
        const data:proyect= await insertProyect({titulo:titulo, descripcion:descripcion, autor:autores})
        res.status(200).json({ status: 200, proyecto: data, message: 'Proyecto agregado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
});

router.put('/state/:id', isAdmin,async(req, res)=>{
    try {
        const {estado} = req.body;
        const data:boolean= await updateStateProyect({id:+req.params.id, estado:estado})
        res.status(200).json({ status: 200, proyecto: data, message:data? 'Proyecto actualizado correctamente':'No se actualizo ningun proyecto' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
});

router.post('/comments/:id', async(req:any, res)=>{
  try {
      const {descripcion}= req.body;
      const data= await commentProyect({cedula:req.user.cedula, id:req.params.id, descripcion:descripcion});
      res.status(200).json({ status: 200, comment: data, message: 'comentario enviado' });
  } catch (e) {
      res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
  }
});

router.put('/:id', uploads.single('file') ,async(req:any, res)=>{
  try {
      console.log(req.file?.filename)
      const resultado: boolean=await updateUrlProyect({
          url:req.file?.filename,
          id:+req.params.id
      });
      res.status(200).json({ status: 200, resultado: resultado, message: 'proyecto actualizado correctamente' });
  } catch (e) {
      res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
  }
});

export default router;