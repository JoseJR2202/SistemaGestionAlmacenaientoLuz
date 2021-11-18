import * as Yup from 'yup'

export const schemaLogin= Yup.object().shape({
    cedula: Yup.number()
    .required("Este campo es requerido")
    .positive("La cedula debe ser un numero positivo")
    .integer("la cedula es un valor entero")
    .min(7,"debe ser un numero de minimo 7 cifras"),
    clave: Yup.string()
    .required("Este campo es requerido")
    .min(7, "la clave debe tener minimo 5 caracteres")
    .max(30, "la clave debe tener minimo 30 caracteres")
});

export const schemaChangeKey= Yup.object().shape({
    clave: Yup.string()
    .required("Este campo es requerido")
    .min(7, "la clave debe tener minimo 5 caracteres")
    .max(30, "la clave debe tener minimo 30 caracteres"),
    confirmarClave: Yup.string()
    .required("Este campo es requerido")
    .min(7, "la clave debe tener minimo 5 caracteres")
    .max(30, "la clave debe tener minimo 30 caracteres"),
});

export const schemaProyect= Yup.object().shape({
    titulo: Yup.string()
    .required("Este campo es requerido")
    .min(10, "la clave debe tener minimo 5 caracteres")
    .max(300, "la clave debe tener minimo 30 caracteres"),
    autores: Yup.string()
    .required("Este campo es requerido"),
    descripcion: Yup.string()
    .required("Este campo es requerido")
    .min(20,"Explica un poca mas de que trata la reunion, minimo 20 caracteres")
    .max(2000,"Maximo 2000 caracteres"),
    archivo: Yup.string()
    .required("Este campo es requerido")
});

export const schemaMetting= Yup.object().shape({
    asunto: Yup.string()
    .required("Este campo es requerido")
    .min(10, "la clave debe tener minimo 10 caracteres")
    .max(300, "la clave debe tener minimo 30 caracteres"),
    fecha: Yup.date()
    .required("Este campo es requerido"),
    hora: Yup.string()
    .required("Este campo es requerido"),
    invitados: Yup.string()
    .required("Este campo es requerido"),
    descripcion: Yup.string()
    .required("Este campo es requerido")
    .min(20,"Explica un poca mas de que trata la reunion, minimo 20 caracteres")
    .max(2000,"Maximo 2000 caracteres")
});