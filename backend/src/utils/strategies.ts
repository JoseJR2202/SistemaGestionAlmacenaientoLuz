import { getUserById, comparePassword } from '@helpers/session';
import { Strategy } from 'passport-local';

export const LocalStrategy = new Strategy(
  {
    usernameField: 'cedula',
    passwordField: 'clave',
  },
  async (cedula:number, clave:string, done) => {
    try {
      const user = await getUserById(cedula);

      if (!user) {
        return done(null, false);
      }

      const isMatch = clave==user.clave//await comparePassword(clave, user.clave);

      delete user.clave;
      return isMatch ? done(null, user) : done(null, false);
    } catch (e) {
      return done(null, false);
    }
  }
);
