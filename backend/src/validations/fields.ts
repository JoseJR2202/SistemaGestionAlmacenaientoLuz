import { validationResult } from 'express-validator';
import { check } from 'express-validator';

export const loginFieldsValidation = [
  check('cedula').notEmpty({ ignore_whitespace: true }).withMessage('Falta una cedula').isNumeric().isInt().withMessage("Debe ser un numero entero").isLength({min:7}).withMessage("debe tener minimo 7 digitos"),
  check('clave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({min:4, max:20}).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres')
];

export const updateUserFieldsValidation = [
  check('clave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({min:4, max:20}).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres'),
  check('confirmarClave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({min:4, max:20}).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres')
];

export const proyectFieldsValidation=[
  check('titulo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un titulo').isString().isLength({min:10, max:300}).withMessage("Debe tener entre 10 a 300 caracteres"),
  check('autores').notEmpty({ ignore_whitespace: true }).withMessage('Faltan los autores'),
  check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Falta un descripcion').isString().isLength({min:20, max:2000}).withMessage("Debe tener entre 20 a 2000 caracteres"),
  check('archivo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un archivo')
];

export const mettingFieldsValidation=[
  check('asunto').notEmpty({ ignore_whitespace: true }).withMessage('Falta un Asunto').isString().isLength({min:10, max:300}).withMessage("Debe tener entre 10 a 300 caracteres"),
  check('fecha').notEmpty({ ignore_whitespace: true }).withMessage('Falta una fecha').isDate().withMessage('Debe ser una fecha'),
  check('hora').notEmpty({ ignore_whitespace: true }).withMessage('Falta una hora'),
  check('invitados').notEmpty({ ignore_whitespace: true }).withMessage('Faltan los invitados'),
  check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Faltan una descripcion').isString().isLength({min:20, max:2000}).withMessage("Debe tener entre 20 a 2000 caracteres")
];

export const searchProyectFieldsValidation=[
  check('titulo').optional().notEmpty({ ignore_whitespace: true }).isString().isLength({min:10}).withMessage("Debe tener minimo 10 caracteres"),
  check('escuela').optional().notEmpty({ ignore_whitespace: true }).isString().withMessage('Debe ser una cadena'),
  check('facultad').optional().notEmpty({ ignore_whitespace: true }).isString().withMessage('Debe ser una cadena')
];

export const searchMettingFieldsValidation=[
  check('titulo').optional().notEmpty({ ignore_whitespace: true }).isString().isLength({min:10}).withMessage("Debe tener minimo 10 caracteres"),
  check('horario').optional().notEmpty({ ignore_whitespace: true }).isDate().withMessage('Debe ser una fecha'),
]

export const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      message: 'Error en datos enviados',
      error: errors.array()[0],
    });
  } else {
    next();
  }
};
