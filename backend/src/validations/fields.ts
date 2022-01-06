import { validationResult } from 'express-validator';
import { check } from 'express-validator';

export const loginFieldsValidation = [
  check('cedula').notEmpty({ ignore_whitespace: true }).withMessage('Falta una cedula').isNumeric().isInt().withMessage("Debe ser un numero entero").isLength({min:7}).withMessage("debe tener minimo 7 digitos"),
  check('clave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({min:4, max:20}).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres')
];

export const signUpFieldsValidation = [
  check('cedula').notEmpty({ ignore_whitespace: true }).withMessage('Falta una cedula').isNumeric().isInt().withMessage("Debe ser un numero entero").isLength({min:7}).withMessage("debe tener minimo 7 digitos"),
  check('clave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({min:4, max:20}).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres'),
  check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Falta un nombre').isString().isLength({min:10, max:100}).withMessage("Debe tener entre 10 a 100 caracteres"),
  check('correo').optional().notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage("Debe ingresar un correo valido"),
  check('tipo_usuario').notEmpty({ ignore_whitespace: true }).withMessage('Falta indicar el tipo de usuario').isNumeric().isInt().withMessage("Debe ser un numero entero").isLength({min:1, max:1}).withMessage("debe ser 1 (Administradores), 2 (Investigadores) o 3 (Estudiante)"),
  check('escuela').notEmpty({ ignore_whitespace: true }).isNumeric().isInt().withMessage("Debe ser un numero entero")
]

export const updateUserFieldsValidation = [
  check('clave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({min:4, max:20}).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres'),
  check('confirmarClave').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({min:4, max:20}).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres')
];

export const proyectFieldsValidation=[
  check('titulo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un titulo').isString().isLength({min:10, max:300}).withMessage("Debe tener entre 10 a 300 caracteres"),
  check('autores').notEmpty({ ignore_whitespace: true }).withMessage('Faltan los autores').isArray().isNumeric().withMessage('Debr colocar las cedulas'),
  check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Falta un descripcion').isString().isLength({min:20, max:2000}).withMessage("Debe tener entre 20 a 2000 caracteres"),
];

export const mettingFieldsValidation=[
  check('asunto').notEmpty({ ignore_whitespace: true }).withMessage('Falta un Asunto').isString().isLength({min:10, max:300}).withMessage("Debe tener entre 10 a 300 caracteres"),
  check('fecha').notEmpty({ ignore_whitespace: true }).withMessage('Falta una fecha').isString().withMessage('Debe ser una fecha'),
  check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Faltan una descripcion').isString().isLength({min:20, max:2000}).withMessage("Debe tener entre 20 a 2000 caracteres")
];

export const searchProyectFieldsValidation=[
  check('titulo').optional().notEmpty({ ignore_whitespace: true }).isString().isLength({min:10}).withMessage("Debe tener minimo 10 caracteres"),
  check('escuela').optional().notEmpty({ ignore_whitespace: true }).isString().withMessage('Debe ser una cadena'),
  check('facultad').optional().notEmpty({ ignore_whitespace: true }).isString().withMessage('Debe ser una cadena')
];

export const searchMettingFieldsValidation=[
  check('titulo').optional().notEmpty({ ignore_whitespace: true }).isString().isLength({min:5}).withMessage("Debe tener minimo 10 caracteres"),
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
