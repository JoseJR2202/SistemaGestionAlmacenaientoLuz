"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = __importDefault(require("module-alias"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production';
const helpersPath = !dev ? path_1.default.resolve(__dirname, '..', '..', 'build', 'helpers') : path_1.default.resolve(__dirname, '..', 'helpers');
const utilsPath = !dev ? path_1.default.resolve(__dirname, '..', '..', 'build', 'utils') : path_1.default.resolve(__dirname, '..', 'utils');
const validationsPath = !dev ? path_1.default.resolve(__dirname, '..', '..', 'build', 'validations') : path_1.default.resolve(__dirname, '..', 'validations');
const middlewaresPath = !dev ? path_1.default.resolve(__dirname, '..', '..', 'build', 'middlewares') : path_1.default.resolve(__dirname, '..', 'middlewares');
const configPath = !dev ? path_1.default.resolve(__dirname, '..', '..', 'build', 'config') : path_1.default.resolve(__dirname, '..', 'config');
const rootPath = !dev ? path_1.default.resolve(__dirname, '..', '..', 'build') : path_1.default.resolve(__dirname, '..');
const typesPath = !dev ? path_1.default.resolve(__dirname, '..', '..', 'build', 'interfaces') : path_1.default.resolve(__dirname, '..', 'interfaces');
module_alias_1.default.addAliases({
    '@helpers': helpersPath,
    '@utils': utilsPath,
    '@validations': validationsPath,
    '@middlewares': middlewaresPath,
    '@config': configPath,
    '@root': rootPath,
    '@interfaces': typesPath,
});
//# sourceMappingURL=alias.js.map