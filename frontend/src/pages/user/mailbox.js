import React from 'react'
import Navbar from '../../component/navBar'
import {Row, Container, Col} from 'react-bootstrap'
import Table from '../../component/table';
import {headMailBox} from '../../schemas/schemaHeadTable';

const mailbox = () => {
  return (
    <Container fluid={true}>
        <Row>
            <Navbar stop={true}/>
        </Row>
        <br/><br/>
        <Row className="justify-content-center">
            <Col xs="auto">
            <h2>Buzon de comentarios</h2>
            </Col>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <Table 
          head={headMailBox}
          contend={[{
            id:1,
            titulo:"Proyecto de prueba 1",
            extra:"Jose Jimenez"
          },{
            id:7,
            titulo:"Proyecto de prueba 2",
            extra:"Mario Gonzalez"
          },{
            id:3,
            titulo:"Proyecto de prueba 3",
            extra:"Genyelbert Acosta"
          },{
            id:4,
            titulo:"Proyecto de prueba 5",
            extra:"Anonimo X"
          }]}
          />
      </Row>
    </Container>
  )
}

export default mailbox;