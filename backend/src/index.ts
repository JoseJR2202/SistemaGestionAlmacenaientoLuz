import './config/alias'
import path from 'path';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import session from 'express-session';
import passport from 'passport';
import { LocalStrategy } from '@utils/strategies';

const app = express();

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
