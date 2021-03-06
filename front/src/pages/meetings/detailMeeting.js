import React, {useState, useEffect} from 'react'
import Navbar from '../../component/navBar'
import {Row, Col, Container, Button} from 'react-bootstrap'
import { useParams, useNavigate } from "react-router-dom";
import {detailMeeting, isParticipant, startMeeting, commentsMeeting, culminateMeeting, insertCommentMeeting, participateMeeting} from '../../utils/meeting.comm';
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
  const [isAdmin, setAdmin]= useState(false);
  const [status, setStatus]= useState('');
  const [participa, setParticipa]= useState(false);
  const [inicio, setInicio] = useState(false);
  const [comentarios, setComentarios]=useState([{nombre:'', fecha:"", contenido:""}]);
  const [refresh, setRefresh]= useState(false);
  
  const indicateCulminateMeeting= async()=>{
    const result= await culminateMeeting(searchParams.id);
    switch(result.status){
      case 200:{
        if(result.meeting)
          navigate(`/`)
        break;
      }
      case 400:{
        alert('Por seguridad su sesion a finalizado, por favor vuevla a ingresar');
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('acceso');
        navigate('/login');
        break;
      }
      case 403:{
        alert("no tienes acceso a estas funciones");
        sessionStorage.setItem('acceso', result.type);
        navigate('/');
        break;
      }
      default:{
        
      }
    }
  }

  const indicateStartMeeting= async()=>{
    const result= await startMeeting(searchParams.id);
    switch(result.status){
      case 200:{
        if(result.meeting)
          navigate(`/reuniones/room/${searchParams.id}`)
        break;
      }
      case 400:{
        alert('Por seguridad su sesion a finalizado, por favor vuevla a ingresar');
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('acceso');
        navigate('/login');
        break;
      }
      case 403:{
        alert("no tienes acceso a estas funciones");
        sessionStorage.setItem('acceso', result.type);
        navigate('/');
        break;
      }
      case 500:{
        alert("Ya usted partcipa en esta reunion!")
        break
      }
      default:{
        
      }
    }
  }

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
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('acceso');
        navigate('/login');
        break;
      }
      case 403:{
        alert("no tienes acceso a estas funciones");
        sessionStorage.setItem('acceso', result.type);
        navigate('/');
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
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('acceso');
        navigate('/login');
        break;
      }
      case 403:{
        alert("no tienes acceso a estas funciones");
        sessionStorage.setItem('acceso', result.type);
        navigate('/');
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
        const {asunto, descripcion, fecha_inicio, fecha_fin, participantes, estado, admin, inicio}= result.meeting;
        setTitulo(asunto);
        setDescripcion(descripcion);
        setFecha(fecha_inicio);
        setFechaFin(fecha_fin)
        setParticipantes(participantes);
        setInicio(inicio);
        if(admin)
          setAdmin(admin);
        else if(sessionStorage.getItem('acceso')==='Administrador' || sessionStorage.getItem('acceso')==='investigador'){
          const result2= await isParticipant(id);
          switch(result2.status){
            case 200:{
              setParticipa(result2.meeting);
              break;
            }
            case 400:{
              alert('Por seguridad su sesion a finalizado, por favor vuevla a ingresar');
              sessionStorage.removeItem('auth');
              sessionStorage.removeItem('acceso');
              navigate('/login');
              break;
            }
            case 403:{
              alert("no tienes acceso a estas funciones");
              sessionStorage.setItem('acceso', result.type);
              navigate('/');
              break;
            }
            default:{
              
            }
          }
        }     
        setStatus(estado);
        const result2= await commentsMeeting(id);
        if(result.status!==403){
          setComentarios(result2.comment);
          console.log(result2)
        }else if(sessionStorage.getItem('acceso')!==result.type){
          sessionStorage.setItem('acceso', result.type);
        }
        break;
      }
      case 400:{
        alert('Por seguridad su sesion a finalizado, por favor vuevla a ingresar');
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('acceso');
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
            {isAdmin && inicio?
            <>
              {status!=='Iniciado'?
              <>
                <Button variant="primary" onClick={indicateStartMeeting}>Comenzar reunion</Button>
              </>
              :
              <>
                <Button variant="primary" onClick={()=>{navigate(`/reuniones/room/${searchParams.id}`)}}>Entrar en la reunion</Button>
              </>
              }
              <Button variant="primary" onClick={indicateCulminateMeeting}>Terminar reunion</Button>
            </>
            :
            <></>
            }
            {!isAdmin && participa && status==='Iniciado'?
            <>
              <Button variant="primary" onClick={()=>{navigate(`/reuniones/room/${searchParams.id}`)}}>Entrar en la reunion</Button>
            </>
            :
            <></>
            }
          </Col>
      </Row>
      <br/><br/>
      {
          sessionStorage.getItem("acceso")==="Estudiante"?
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