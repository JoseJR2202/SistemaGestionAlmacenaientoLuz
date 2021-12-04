import { Router } from 'express';
import session from './session';
import users from './users';
// import file from './files';
import proyects from './proyects';
import { isAuth } from '@validations/auth';
const router = Router();

router.use('/session', session);
router.use('/users', isAuth,users);
router.use('/proyects', isAuth,proyects);
// router.use('/file',isAuth, file);

export default router;
