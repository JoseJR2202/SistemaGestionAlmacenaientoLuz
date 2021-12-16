import React from 'react'
import Navbar from '../../component/navBar'
import {Row, Col, Container, Button, Form, FloatingLabel} from 'react-bootstrap'
import { ImFilePdf } from 'react-icons/im';
import {FaDownload} from 'react-icons/fa'
const detailProyect = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Navbar/>
      </Row>
      <Row>
        <h2>Titulo de la investigacion</h2>
      </Row>
      <br/><br/>
      <Row xs={1} sm={2} lg={2} xl={2} xll={2} md={1}>
          <Col>
            <h3>Descripcion</h3>
            <br/>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis autem at laboriosam explicabo corrupti obcaecati dignissimos, assumenda odio alias asperiores earum aut quas voluptas reiciendis illo quo ab sapiente, totam culpa debitis dicta magnam sit nam. Repellendus dolore quasi debitis qui pariatur ea reiciendis voluptatum, impedit velit harum neque! Nemo aliquid sed numquam consequatur minima quos repellendus a suscipit libero aut dolorem voluptatem possimus placeat mollitia maxime sunt nihil, adipisci harum ipsum at officiis nisi accusamus? Soluta voluptas distinctio veniam corrupti, fuga quaerat perspiciatis alias omnis, dolorum officia vero exercitationem vitae hic nesciunt tenetur animi culpa eaque odio, ab ullam magnam accusantium aspernatur velit sequi. Ad quidem eligendi omnis ducimus repellendus. Nemo sint, vero quasi est qui officiis dicta quam, possimus, sunt odit omnis! Quo aperiam recusandae adipisci consequuntur molestias totam dolorem odio, excepturi facilis saepe quia vitae dicta asperiores, illo, architecto ipsa fugiat quod corporis. Officia similique distinctio ex numquam nobis consectetur quidem aspernatur recusandae nesciunt non. Dolore at adipisci animi modi totam obcaecati architecto omnis cum debitis tempora repellendus nam praesentium eius dolorem, earum, ab veniam maiores quo in. Dolorum suscipit adipisci repellat esse accusamus neque quidem exercitationem aliquid odit totam vel, aliquam quis libero, sequi laborum corporis. </p>
          </Col>
          <Col xs={4}>
            <h3>Detalles</h3>
            <br/>
            <p><strong>Autores:</strong> xxxxxxxxxxxxx</p>
            <p><strong>Fecha:</strong> xxxxxxxxxxxxx</p>
            <a href='#!'><ImFilePdf/> Visualizar Archivo</a>
            <Button variant="primary"><FaDownload/> Descargar</Button>
          </Col>
      </Row>
      <br/><br/>
      <Row>
        <h3>Dejar un comentario</h3>
        <br/>
        <FloatingLabel controlId="textArea" label="">
            <Form.Control
            as="textarea"
            style={{ height: '100px' }}
            />
        </FloatingLabel>
        <Button variant="primary">Enviar</Button>
      </Row>
      <br/>
      <Row>
        <h3>Comentarios</h3>
        <br/>
        {/*Lista de comentarios*/}
      </Row>
      <br/>
    </Container>
   
  )
}

export default detailProyect;