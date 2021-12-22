import React,{useEffect, useState} from 'react'
import Navbar from '../../component/navBar'
import {Row, Col, Container, Button, Form, FloatingLabel} from 'react-bootstrap'
import { ImFilePdf } from 'react-icons/im';
import {FaDownload} from 'react-icons/fa';
import { useParams, useNavigate } from "react-router-dom";
import {getDetailProyect} from '../../utils/proyects.comm';

const DetailProyect = () => {
  
  const searchParams = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo]= useState('');
  const [descripcion, setDescripcion]= useState('');
  const [autores, setAutores] = useState(['']);
  const [url, setUrl] = useState('');
  const [fecha, setFecha]= useState('');

  const setDetail= async(id)=>{
    const result= await getDetailProyect(id);
    switch(result.status){
      case 200:{
        const {titulo, descripcion, fecha_publicacion, url_archivo, autores}= result.proyecto;
        setTitulo(titulo);
        setDescripcion(descripcion);
        setUrl(url_archivo);
        setAutores(autores);
        setFecha(fecha_publicacion);
        break;
      }
      case 400:{
        alert('Por seguridad su sesion a finalizado, por favor vuevla a ingresar');
        navigate('/login');
        break;
      }
      default:{
        
      }
    }
  }

  useEffect(()=>{
    setDetail(searchParams.id);
    // eslint-disable-next-line
  },[searchParams])

  return (
    <Container fluid={true}>
      <Row>
        <Navbar stop={true}/>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={"auto"}>
          <h2>{titulo}</h2>
        </Col>
      </Row>
      <br/><br/>
      <Row xs={1} sm={2} lg={2} xl={2} xll={2} md={1}>
          <Col>
            <h3>Descripcion</h3>
            <br/>
            <p>{descripcion}</p>
          </Col>
          <Col xs={4}>
            <h3>Detalles</h3>
            <br/>
            <p><strong>Autores:</strong> {autores.toString()} </p>
            <p><strong>Fecha:</strong> {fecha}</p>
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

export default DetailProyect;