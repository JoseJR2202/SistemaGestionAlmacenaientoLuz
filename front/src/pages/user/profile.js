import React, {useState} from 'react';
import Navbar from '../../component/navBar';
import {Row, Col, Container, Button, Stack, Modal} from 'react-bootstrap';
import Table from '../../component/table';
import {headProyect} from '../../schemas/schemaHeadTable';
import { FaUserCircle } from 'react-icons/fa';
import { fieldChangeKey } from '../../schemas/schemaField';
import { jsonChangeKey } from '../../schemas/schemaForm';
import { schemaChangeKey } from '../../schemas/schemaValidation';
import Forms from '../../component/form';
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const [showModal, setShowModal]= useState(false);
  const navigate= useNavigate();

  return (
    <Container fluid={true}>
      <Row>
        <Navbar stop={true}/>
      </Row>
      <br/><br/><br/>
      <Row className="justify-content-center">
        <Col xs="auto">
          <FaUserCircle size="200"/>
        </Col>
        <Col xs="auto">
          <p><strong>Nombre:</strong> Jose Jimenez</p>
          <p><strong>Cedula:</strong> 30.355.153</p>
          <p><strong>Correo:</strong> josemartinjr22@gmail.com</p>
          <p><strong>Facultad:</strong> XXXXXX</p>
          <p><strong>Escuela:</strong> XXXXXXX</p>
          <p><strong>Clave:</strong> ******** <Button variant="primary" onClick={()=>setShowModal(true)}>Cambiar clave</Button> </p>
        </Col>
        {
          sessionStorage.getItem("acceso")!=="Usuario"?//si es distinto de estudiante
          <>
            <Col xs="auto">
              <section>
              <Stack gap={2} >
                <Button variant="primary" onClick={()=>navigate('/investigaciones/publicar')}>Publicar investigacion</Button>
                <Button variant="primary" onClick={()=>navigate('/reuniones/crear')}>Crear Reunion</Button>
                <Button variant="primary" onClick={()=>navigate('/reuniones/proximas')}>Proximas Reuniones</Button>
                <Button variant="primary" onClick={()=>navigate('/perfil/buzon')}>Buzon</Button>
                {sessionStorage.getItem("acceso")==="Admin"?
                <><Button variant="primary" onClick={()=>navigate('/perfil/solicitudes')}>Solicitudes</Button></>
                :<></>
                }
              </Stack>
              </section>
            </Col>
          </>
          :<></>
        }
      </Row>
      <br/><br/>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h2>Ultimos proyectos comentados</h2>
        </Col>
      </Row>
      <br/>
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
      <Modal
      show={showModal}
      onHide={()=>{setShowModal(false)}}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           MODIFICAR CLAVE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Forms jsonfield={fieldChangeKey} jsonform={jsonChangeKey} jsonValidation={schemaChangeKey} submit={ (valores, {resetForm}) => {
                    resetForm();
                    console.log(valores);
                    setShowModal(false);                 
              }}/>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default Profile;