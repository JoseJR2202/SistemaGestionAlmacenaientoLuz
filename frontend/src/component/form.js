import React from 'react'
import * as Yup from 'yup'
import { Formik, Field, ErrorMessage } from "formik"
import { Form } from 'react-bootstrap';


const form = ()=>{
    
    const schemaLogin= Yup.object().shape({
        cedula: Yup.number()
        .required("Este campo es requerido")
        .integer("numero no valido"),
        contrasenia: Yup.string()
        .required("Este campo es requerido")
        .min(5, "minimo 5 caracteres")
    })

    return(
        <div>
            <Formik
            initialValues={{
                 cedula:"",
                contrasenia:""
            }}
            validationSchema={schemaLogin}
            >
                <form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Cedula</Form.Label>
                        <Field
                            className="form-control"
                            name="cedula"
                            placeholder="ingrese su cedula"
                            type="text"
                        />
                        <ErrorMessage 
                            name="cedula"
                            component="div"
                            className="field-error text-danger"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Password</Form.Label>
                        <Field
                            className="form-control"
                            name="contrasenia"
                            placeholder="ingrese su cedula"
                            type="password"
                        />
                        <ErrorMessage 
                            name="contrasenia"
                            component="div"
                            className="field-error text-danger"
                        />
                    </Form.Group>
                </form>
            </Formik>
        </div>
    )
}

export default form;