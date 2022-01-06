"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResult = exports.searchMettingFieldsValidation = exports.searchProyectFieldsValidation = exports.mettingFieldsValidation = exports.proyectFieldsValidation = exports.updateUserFieldsValidation = exports.signUpFieldsValidation = exports.loginFieldsValidation = void 0;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
exports.loginFieldsValidation = [
    (0, express_validator_2.check)('cedula').notEmpty({ ignore_whitespace: true }).withMessage('Falta una cedula').isNumeric().isInt().withMessage("Debe ser un numero entero").isLength({ min: 7 }).withMessage("debe tener minimo 7 digitos"),
    (0, express_validator_2.check)('clave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({ min: 4, max: 20 }).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres')
];
exports.signUpFieldsValidation = [
    (0, express_validator_2.check)('cedula').notEmpty({ ignore_whitespace: true }).withMessage('Falta una cedula').isNumeric().isInt().withMessage("Debe ser un numero entero").isLength({ min: 7 }).withMessage("debe tener minimo 7 digitos"),
    (0, express_validator_2.check)('clave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({ min: 4, max: 20 }).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres'),
    (0, express_validator_2.check)('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Falta un nombre').isString().isLength({ min: 10, max: 100 }).withMessage("Debe tener entre 10 a 100 caracteres"),
    (0, express_validator_2.check)('correo').optional().notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage("Debe ingresar un correo valido"),
    (0, express_validator_2.check)('tipo_usuario').notEmpty({ ignore_whitespace: true }).withMessage('Falta indicar el tipo de usuario').isNumeric().isInt().withMessage("Debe ser un numero entero").isLength({ min: 1, max: 1 }).withMessage("debe ser 1 (Administradores), 2 (Investigadores) o 3 (Estudiante)"),
    (0, express_validator_2.check)('escuela').notEmpty({ ignore_whitespace: true }).isNumeric().isInt().withMessage("Debe ser un numero entero")
];
exports.updateUserFieldsValidation = [
    (0, express_validator_2.check)('clave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({ min: 4, max: 20 }).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres'),
    (0, express_validator_2.check)('confirmarClave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({ min: 4, max: 20 }).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres')
];
exports.proyectFieldsValidation = [
    (0, express_validator_2.check)('titulo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un titulo').isString().isLength({ min: 10, max: 300 }).withMessage("Debe tener entre 10 a 300 caracteres"),
    (0, express_validator_2.check)('autores').notEmpty({ ignore_whitespace: true }).withMessage('Faltan los autores').isArray().isNumeric().withMessage('Debr colocar las cedulas'),
    (0, express_validator_2.check)('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Falta un descripcion').isString().isLength({ min: 20, max: 2000 }).withMessage("Debe tener entre 20 a 2000 caracteres"),
];
exports.mettingFieldsValidation = [
    (0, express_validator_2.check)('asunto').notEmpty({ ignore_whitespace: true }).withMessage('Falta un Asunto').isString().isLength({ min: 10, max: 300 }).withMessage("Debe tener entre 10 a 300 caracteres"),
    (0, express_validator_2.check)('fecha').notEmpty({ ignore_whitespace: true }).withMessage('Falta una fecha').isString().withMessage('Debe ser una fecha'),
    (0, express_validator_2.check)('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Faltan una descripcion').isString().isLength({ min: 20, max: 2000 }).withMessage("Debe tener entre 20 a 2000 caracteres")
];
exports.searchProyectFieldsValidation = [
    (0, express_validator_2.check)('titulo').optional().notEmpty({ ignore_whitespace: true }).isString().isLength({ min: 10 }).withMessage("Debe tener minimo 10 caracteres"),
    (0, express_validator_2.check)('escuela').optional().notEmpty({ ignore_whitespace: true }).isString().withMessage('Debe ser una cadena'),
    (0, express_validator_2.check)('facultad').optional().notEmpty({ ignore_whitespace: true }).isString().withMessage('Debe ser una cadena')
];
exports.searchMettingFieldsValidation = [
    (0, express_validator_2.check)('titulo').optional().notEmpty({ ignore_whitespace: true }).isString().isLength({ min: 5 }).withMessage("Debe tener minimo 10 caracteres"),
    (0, express_validator_2.check)('horario').optional().notEmpty({ ignore_whitespace: true }).isDate().withMessage('Debe ser una fecha'),
];
const checkResult = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 400,
            message: 'Error en datos enviados',
            error: errors.array()[0],
        });
    }
    else {
        next();
    }
};
exports.checkResult = checkResult;
//# sourceMappingURL=fields.js.map