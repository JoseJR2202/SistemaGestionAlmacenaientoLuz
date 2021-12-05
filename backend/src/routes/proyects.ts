import { Router } from 'express';
// import { loginFieldsValidation, checkResult } from '@validations/fields';
import { proyect, detailProyect, proyectFilter } from '@interfaces/Proyect';
import { getProyectRecent, getProyect, getProyectFilter, insertProyect, updateStateProyect } from '@helpers/proyects';

const router = Router();

router.get('/recent', async (req, res) => {
  try {
    const data:string[]= await getProyectRecent();
    res.status(200).json({ status: 200, usuario: data, message: 'Proyectos recientes enviados' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
  }
});

router.get('/:id', async(req, res)=>{
  try {
    const data:detailProyect= await getProyect(+req.params.id);
    res.status(200).json({ status: 200, usuario: data, message: 'Datos del proyecto enviado correctamente' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
  }
});

router.post('/filter',async(req, res)=>{
  try {
    const {titulo, escuela, facultad} = req.body;
    console.log(titulo, escuela, facultad)
    const data= await getProyectFilter({titulo:titulo, escuela:escuela, facultad:facultad})
    res.status(200).json({ status: 200, data: data, message: 'Proyectos filtrados correctamente' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
  }
});

router.post('/',async(req, res)=>{
    try {
        const {titulo, descripcion, autor} = req.body;
        const data:proyect= await insertProyect({titulo:titulo, descripcion:descripcion, autor:autor})
        res.status(200).json({ status: 200, usuario: data, message: 'Proyecto agregado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
})

router.put('/state/:id',async(req, res)=>{
    try {
        const {estado} = req.body;
        const data:boolean= await updateStateProyect({id:+req.params.id, estado:estado})
        res.status(200).json({ status: 200, usuario: data, message:data? 'Proyecto actualizado correctamente':'No se actualizo ningun proyecto' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
    }
})

export default router;