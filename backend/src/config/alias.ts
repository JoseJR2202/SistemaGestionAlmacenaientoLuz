import moduleAlias from 'module-alias';
import path from 'path';
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

const helpersPath = !dev ? path.resolve(__dirname, '..', '..', 'build', 'helpers') : path.resolve(__dirname, '..', 'helpers');
const utilsPath = !dev ? path.resolve(__dirname, '..', '..', 'build', 'utils') : path.resolve(__dirname, '..', 'utils');
const validationsPath = !dev ? path.resolve(__dirname, '..', '..', 'build', 'validations') : path.resolve(__dirname, '..', 'validations');
const middlewaresPath = !dev ? path.resolve(__dirname, '..', '..', 'build', 'middlewares') : path.resolve(__dirname, '..', 'middlewares');
const configPath = !dev ? path.resolve(__dirname, '..', '..', 'build', 'config') : path.resolve(__dirname, '..', 'config');
const rootPath = !dev ? path.resolve(__dirname, '..', '..', 'build') : path.resolve(__dirname, '..');
const typesPath = !dev ? path.resolve(__dirname, '..', '..', 'build', 'interfaces') : path.resolve(__dirname, '..', 'interfaces');

moduleAlias.addAliases({
  '@helpers': helpersPath,
  '@utils': utilsPath,
  '@validations': validationsPath,
  '@middlewares': middlewaresPath,
  '@config': configPath,
  '@root': rootPath,
  '@interfaces': typesPath,
});
