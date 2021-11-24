import React from 'react'
import Navbar from '../../component/navBar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from '../../component/table'

const investigation = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Navbar/>
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h3>Buscador de Proyectos de Investigacion</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
          <Table 
          head={[{
              Header:"Proyecto de investigacion",
              accessor:'titulo'
          }, {
            Header:"escuela",
            accessor:'extra'
          }]}
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