import React, {useState, useEffect} from 'react'
import Navbar from '../../component/navBar'
import {Row, Col, Container, Button} from 'react-bootstrap'
import { useParams, useNavigate } from "react-router-dom";
import {detailMeeting, commentsMeeting, insertCommentMeeting, participateMeeting} from '../../utils/meeting.comm';
import { fieldComment } from '../../schemas/schemaField';
import { jsonComment } from '../../schemas/schemaForm';
import { schemaComment } from '../../schemas/schemaValidation';
import ListComments from '../../component/listComent';
import Forms from '../../component/form';

const DetailMeeting = () => {

  const searchParams = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo]= useState('');
  const [descripcion, setDescripcion]= useState('');
  const [fecha, setFecha]= useState('');
  const [fechaFin, setFechaFin]= useState('');
  const [paticipantes, setParticipantes]= useState(0)
  const [comentarios, setComentarios]=useState([{nombre:'', fecha:"", contenido:""}]);
  const [refresh, setRefresh]= useState(false);
  
  const indicateParticipation= async()=>{
    const result= await participateMeeting(searchParams.id);
    switch(result.status){
      case 200:{
        if(!result.meeting)
          alert("Ya usted partcipa en esta reunion!")
        setRefresh(!refresh)
        break;
      }
      case 400:{
        alert('Por seguridad su sesion a finalizado, por favor vuevla a ingresar');
        navigate('/login');
        break;
      }
      case 500:{
        alert("Ya usted partcipa en esta reunion!")
        break
      }
      default:{
        
      }
    }
  };

  const submitComment=async(valores, {resetForm})=>{
    resetForm();
    const result= await insertCommentMeeting(valores.comentario, searchParams.id);
    switch(result.status){
      case 200:{
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
  };

  const setDetail= async(id)=>{
    const result= await detailMeeting(id);
    switch(result.status){
      case 200:{
        const {asunto, descripcion, fecha_inicio, fecha_fin, participantes}= result.meeting;
        setTitulo(asunto);
        setDescripcion(descripcion);
        setFecha(fecha_inicio);
        setFechaFin(fecha_fin)
        setParticipantes(participantes);
        const result2= await commentsMeeting(id);
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
        <Navbar/>
      </Row>
      <Row>
        <h2>{titulo}</h2>
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
            <p><strong>Fecha de inicio:</strong> {fecha}</p>
            {fechaFin? 
              <><p><strong>Fecha de finalizacion:</strong> {fechaFin}</p></>
              :
              <></>
            }
            <p><strong>Cantidad de participantes:</strong> {paticipantes}</p>
            <Button variant="primary" onClick={indicateParticipation}>Participar</Button>
          </Col>
      </Row>
      <br/><br/>
      {
          sessionStorage.getItem("acceso")==="Usuario"?
          <></>:
          <>
            <Row>
                <h3>Dejar un comentario</h3>
                <br/>
                <Forms jsonfield={fieldComment} jsonform={jsonComment} jsonValidation={schemaComment} submit={submitComment}/>
            </Row>
            <br/>
            <Row>
                <h3>Comentarios</h3>
                <br/>
                <ListComments jsonComments={comentarios}/>
            </Row>   
          </>
      }
    </Container>
   
  )
}

export default DetailMeeting;