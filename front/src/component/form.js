import React from 'react'
import { Formik, Field, ErrorMessage } from "formik"
import { Form, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const form = ({jsonform, jsonfield, jsonValidation, submit})=>{

    const items = jsonfield.map(item=>{
        return(
            item.Col?
        <Col  key={item.name} sm>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>{item.title? item.title:item.name}</Form.Label>
                <Field
                    className="form-control"
                    name={item.name}
                    placeholder={`ingrese su ${item.title}`}
                    type={item.type}
                    as={item.as? item.as : 'input'}
                />
                <ErrorMessage 
                    name={item.name}
                    component="div"
                    className="field-error text-danger"
                />

                </Form.Group>
        </Col>
         :
         <div  key={item.name}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>{item.title? item.title:item.name}</Form.Label>
                <Field
                    className="form-control"
                    name={item.name}
                    placeholder={`ingrese su ${item.title}`}
                    type={item.type}
                    as={item.as? item.as : 'input'}
                />
                <ErrorMessage 
                    name={item.name}
                    component="div"
                    className="field-error text-danger"
                />

                </Form.Group>
        </div>
         )
        
    })

    return(
        <div>
         <Formik
            initialValues={jsonform}
            validationSchema={jsonValidation}
            onSubmit={submit}
            >
                {({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          validating,
          valid,
        }) =>
                    (
                    <form onSubmit={handleSubmit}>
                         <Row>
                            {items}
                            <Col xs="auto" >
                                <br/>
                                <Button 
                                variant="outline-primary"
                                type="submit"
                                size="lg"
                                >
                                    Enviar
                                </Button>
                            </Col>
                        </Row>
                    </form>
                    )}
            </Formik>
        </div>
    )
}

export default form;