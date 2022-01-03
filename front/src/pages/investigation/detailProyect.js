import React,{useEffect, useState} from 'react'
import Navbar from '../../component/navBar';
import VisualPDF from '../../component/visualPDF';
import ListComments from '../../component/listComent';
import {Row, Col, Container, Button, Modal} from 'react-bootstrap'
import { ImFilePdf } from 'react-icons/im';
import {FaDownload} from 'react-icons/fa';
import { useParams, useNavigate } from "react-router-dom";
import {getDetailProyect, getProyect, getCommentsProyect, insertCommentProyect} from '../../utils/proyects.comm';
import { fieldComment } from '../../schemas/schemaField';
import { jsonComment } from '../../schemas/schemaForm';
import { schemaComment } from '../../schemas/schemaValidation';
import Forms from '../../component/form';

const DetailProyect = () => {
  
  const searchParams = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo]= useState('');
  const [descripcion, setDescripcion]= useState('');
  const [autores, setAutores] = useState(['']);
  const [url, setUrl] = useState('');
  const [urlVisual, setUrlVisual] = useState('');
  const [nombreDescarga, setNombreDescarga]= useState('');
  const [fecha, setFecha]= useState('');
  const [comentarios, setComentarios]=useState([{nombre:'', fecha:"", contenido:""}]);
  const [showModal, setShowModal]= useState(false);
  const [refresh, setRefresh]= useState(false);

  const submitComment=async(valores, {resetForm})=>{
    resetForm();
    const result= await insertCommentProyect(searchParams.id,valores.comentario);
    switch(result.status){
      case 200:{
        alert("mensaje enviado existosamente");
        setRefresh(!refresh)
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

  const setDetail= async(id)=>{
    const result= await getDetailProyect(id);
    switch(result.status){
      case 200:{
        const {titulo, descripcion, fecha_publicacion, url_archivo, autores}= result.proyecto;
        setTitulo(titulo);
        setDescripcion(descripcion);
        setUrlVisual(url_archivo);
        setUrl(await getProyect(url_archivo));
        setAutores(autores);
        setFecha(fecha_publicacion);
        setNombreDescarga(url_archivo.substring(url_archivo.indexOf('-')+1))
        const result2= await getCommentsProyect(id);
        setComentarios(result2.comment);
        console.log(result2)
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
  },[searchParams, refresh])

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
            <p> <a href={url} download={nombreDescarga}> <FaDownload/>Descargar Archivo</a> </p>
            <Button variant="primary" onClick={()=>setShowModal(true)}><ImFilePdf/> Visualizar</Button>
          </Col>
      </Row>
      <br/><br/>
      <Row>
        <h2>Dejar un comentario</h2>
        <Forms jsonfield={fieldComment} jsonform={jsonComment} jsonValidation={schemaComment} submit={submitComment}/>
      </Row>
      <br/>
      <Row>
        <h3>Comentarios</h3>
        <br/>
        <ListComments jsonComments={comentarios}/>
      </Row>
      <br/>
      <Modal
      show={showModal}
      onHide={()=>{setShowModal(false)}}
      fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Visualizador de PDF
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VisualPDF url={`http://localhost:5000/files/${urlVisual}`} name={nombreDescarga}/>
        </Modal.Body>
      </Modal>
    </Container>
   
  )
}

export default DetailProyect;