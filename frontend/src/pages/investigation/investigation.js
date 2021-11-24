import React from 'react'
import Navbar from '../../component/navBar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from '../../component/table';
import {headProyect} from '../../schemas/schemaHeadTable';
import Cards from '../../component/listCard'
import imagen from '../../img/chemistry.jpg';
import civil from '../../img/civil.jpg';
import programers from '../../img/computer.jpg';

const investigation = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Navbar/>
      </Row>
      {/* Esto no va en esta vista, es solo para probar la funcionalidad */}
      <Row className="justify-content-center">
        <Col xs="auto">
          <h3>Proyectos recientes</h3>
        </Col>
      </Row>
      <Cards jsonCard={[{
        titulo:"proyecto 1",
        extra:"Jimnenez Jose, Mario Gonzalez"
      },{
        titulo:"proyecto 2",
        extra:"Jimnenez Jose, Mario Gonzalez"
      },{
        titulo:"proyecto 3",
        extra:"Jimnenez Jose, Mario Gonzalez"
      }]}
        image={[imagen,civil,programers]}
      />
      <Row className="justify-content-center">
        <Col xs="auto">
          <h3>Buscador de Proyectos de Investigacion</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
          <Table 
          head={headProyect}
          contend={[{
            id:1,
            titulo:"proyecto de prueba 1",
            extra:"escuela de prueba"
          },{
            id:7,
            titulo:"proyecto de prueba 2",
            extra:"escuela de prueba"
          },{
            id:3,
            titulo:"proyecto de prueba 3",
            extra:"escuela de prueba"
          },{
            id:4,
            titulo:"proyecto de prueba 5",
            extra:"escuela de prueba"
          }]}
          />
      </Row>
    </Container>
   
  )
}

export default investigation