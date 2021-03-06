"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidate = exports.isAdmin = exports.isAuth = exports.isLogged = void 0;
const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send({
            status: 304,
            response: 'Ya existe una sesión',
            type: req.user.tipo_usuario
        });
    }
    else {
        next();
    }
};
exports.isLogged = isLogged;
const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.send({
            status: 400,
            response: 'Debe iniciar sesión primero',
        });
    }
};
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => {
    if (req.user.tipo_usuario === 'Administrador') {
        next();
    }
    else {
        res.send({
            status: 403,
            response: 'No tiene acceso a estas funciones',
            type: req.user.tipo_usuario
        });
    }
};
exports.isAdmin = isAdmin;
const isValidate = (req, res, next) => {
    if (req.user.tipo_usuario === 'Administrador' || req.user.tipo_usuario === 'investigador') {
        next();
    }
    else {
        res.send({
            status: 403,
            response: 'No tiene acceso a estas',
            type: req.user.tipo_usuario
        });
    }
};
exports.isValidate = isValidate;
//# sourceMappingURL=auth.js.map