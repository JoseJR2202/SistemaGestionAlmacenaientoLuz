import './config/alias'
import path from 'path';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import session from 'express-session';
import passport from 'passport';
import { LocalStrategy } from '@utils/strategies';
import compression from 'compression';
import helmet from "helmet";

const app = express();

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // No se deben comprimir las res[uestas si este encabezado está presente.
    return false;
  }
  // Recurrir a la compresión estándar
  return compression.filter(req, res);
};

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'"],
        "frame-ancestors": ["'self'"],
        "object-src":"'self'"
      },
    }
  })
);
app.use(compression({filter: shouldCompress, threshold: 0}))
app.use('/files', express.static(__dirname + '/uploads'));
app.use(express.static(path.resolve('..','front','build')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'superkey',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());

passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((user, done) => {
  done(null, JSON.parse(user));
});

app.use(passport.initialize());

app.use(passport.session());

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('..','front','build','index.html'))
});

export default app;
