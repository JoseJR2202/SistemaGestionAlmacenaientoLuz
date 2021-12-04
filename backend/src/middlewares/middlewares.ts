import passport from 'passport';

export const passportAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({
        err: info,
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).send({
          err: 'Could not log in user',
        });
      }
      res.status(200).send({
        status: 'Login successful!',
      });
    });
  })(req, res, next);
};