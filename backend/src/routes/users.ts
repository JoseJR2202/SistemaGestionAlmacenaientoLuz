import { Router } from 'express';
import { updateKeyUser } from '@helpers/users';
import { updateUserFieldsValidation, checkResult } from '@validations/fields';
import { User } from '@interfaces/User';

const router = Router();

router.get('/', async (req:any, res) => {
  try {
    const {cedula, nombre, correo, tipo_usuario, escuela, facultad} = req.user;
    const data:User={
      correo:correo,
      cedula:cedula,
      nombre:nombre,
      tipo_usuario:tipo_usuario,
      escuela:escuela,
      facultad:facultad
    }
    res.status(200).json({ status: 200, usuario: data, message: 'Perfil del usuario enviado' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Ocurrio un error en el servidor' });
  }
});

router.put('/changeKey', updateUserFieldsValidation, checkResult, async(req:any, res)=>{
  try {
    const {clave} = req.body;
    const data= await updateKeyUser({key:clave, id:req.user.cedula});
    res.status(200).json({ status: 200, usuario: data, message: 'Perfil actualizado correctamente' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'ocurrio un error en el servidor' });
  }
})

export default router;
