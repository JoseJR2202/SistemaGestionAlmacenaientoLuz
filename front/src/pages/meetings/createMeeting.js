import React from 'react'
import Navbar from '../../component/navBar'
import {Row, Container, Col} from 'react-bootstrap'
import { fieldMeeting } from '../../schemas/schemaField';
import { jsonMetting } from '../../schemas/schemaForm';
import { schemaMetting } from '../../schemas/schemaValidation';
import Forms from '../../component/form';

const createMetting = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Navbar stop={true}/>
      </Row>
      <br/><br/>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h2>Crear Reunion</h2>
        </Col>
      </Row>
      <br/>
      <Row className="justify-content-center">
          <Col xs="auto">
            <Forms jsonfield={fieldMeeting} jsonform={jsonMetting} jsonValidation={schemaMetting} submit={ (valores, {resetForm}) => {
                  resetForm();
                  console.log(valores);                
            }}/>
          </Col>
        </Row>
    </Container>
   
  )
}

export default createMetting;