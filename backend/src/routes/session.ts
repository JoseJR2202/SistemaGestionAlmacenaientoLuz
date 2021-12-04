import { Router } from 'express';
import { isLogged, isAuth } from '@validations/auth';
import { passportAuth } from '@middlewares/middlewares';
import { loginFieldsValidation, checkResult } from '@validations/fields';

const router = Router();

router.get('/', (req, res) => {
  res.send('Aqui estan las cosas de login');
});

router.get('/logout', isAuth,(req: any, res) => {
  req.logout();
  req.session.alias=null;
  res.json({ status: 200, message: 'Sesión finalizada.' });
});


router.post('/user', isLogged, loginFieldsValidation, checkResult, passportAuth);

export default router;
