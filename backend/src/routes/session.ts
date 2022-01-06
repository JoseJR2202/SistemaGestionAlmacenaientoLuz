import { Router } from 'express';
import { isLogged, isAuth, isAdmin } from '@validations/auth';
import { passportAuth } from '@middlewares/middlewares';
import { loginFieldsValidation, signUpFieldsValidation, checkResult } from '@validations/fields';
import { insertUser } from '@helpers/session';
import { RegisterUser } from '@interfaces/User';

const router = Router();

router.get('/', (req, res) => {
  res.send('Aqui estan las cosas de login');
});

router.post('/signup',isAuth, isAdmin, signUpFieldsValidation, checkResult, async (req, res) => {
  try {
    const data:RegisterUser = await insertUser(req.body);
    res.status(200).json({ status: 200, usuario: data, message: 'Usuario registrado satisfactoriamente' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Error al registrar un usuario' });
  }
});

router.get('/logout', isAuth,(req: any, res) => {
  req.logout();
  res.json({ status: 200, message: 'Sesión finalizada.' });
});


router.post('/user', isLogged, loginFieldsValidation, checkResult, passportAuth);

export default router;
