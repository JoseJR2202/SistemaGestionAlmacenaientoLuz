import React from 'react'
import Navbar from '../../component/navBar'
import {Row, Container, Col} from 'react-bootstrap'
import { fieldMeeting } from '../../schemas/schemaField';
import { jsonMetting } from '../../schemas/schemaForm';
import { schemaMetting } from '../../schemas/schemaValidation';
import Forms from '../../component/form';
import { useNavigate } from "react-router-dom";
import {createMeeting} from '../../utils/meeting.comm'

const CreateMettings = () => {

  const navigate = useNavigate();

  const submitMeeting= async(valores, {resetForm})=>{
    resetForm();
    console.log(valores)
    const {asunto, descripcion, fecha, hora, invitados}= valores;
    const result= await createMeeting({asunto:asunto, descripcion:descripcion, invitados:invitados.split(','), fecha:fecha+' '+hora});
    console.log(result)
    switch(result.status){
      case 200:{
        alert("Reunion creada")
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

  return (
    <Container fluid={true}>
      <Row>
        <Navbar stop={true}/>
      </Row>
      <br/><br/>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h2>Crear Reunion</h2>
        </Col>
      </Row>
      <br/>
      <Row className="justify-content-center">
          <Col xs="auto">
            <Forms jsonfield={fieldMeeting} jsonform={jsonMetting} jsonValidation={schemaMetting} submit={submitMeeting}/>
          </Col>
        </Row>
    </Container>
   
  )
}

export default CreateMettings;