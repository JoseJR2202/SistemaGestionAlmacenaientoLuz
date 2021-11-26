import React from 'react'
import Navbar from '../../component/navBar'
import {Row, Container, Col} from 'react-bootstrap'
import { fieldProyect } from '../../schemas/schemaField';
import { jsonProyect } from '../../schemas/schemaForm';
import { schemaProyect } from '../../schemas/schemaValidation';
import Forms from '../../component/form';

const publicInvestigation = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Navbar stop={true}/>
      </Row>
      <br/><br/>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h2>Publicar Investigacion</h2>
        </Col>
      </Row>
      <br/>
      <Row className="justify-content-center">
          <Col xs="auto">
            <Forms jsonfield={fieldProyect} jsonform={jsonProyect} jsonValidation={schemaProyect} submit={ (valores, {resetForm}) => {
                  resetForm();
                  console.log(valores);                
            }}/>
          </Col>
        </Row>
    </Container>
   
  )
}

export default publicInvestigation;