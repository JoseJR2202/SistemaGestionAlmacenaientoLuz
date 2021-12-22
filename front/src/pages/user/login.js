import React, {useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FaUserAlt } from 'react-icons/fa';
import { fieldLogin } from '../../schemas/schemaField';
import { jsonLogin } from '../../schemas/schemaForm';
import { schemaLogin } from '../../schemas/schemaValidation';
import Forms from '../../component/form'
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import {login} from '../../utils/session.comm';

const Login = () => {

  const navigate= useNavigate();
  const [dialogError, setDialogError]=useState('');

  const submit = async(valores, {resetForm})=>{
    resetForm();
    const {cedula, clave}= valores;
    const result = await login({cedula:cedula, clave:clave});
    console.log(result);
    switch(result.status){
      case 200:{
        sessionStorage.setItem('auth', true);
        sessionStorage.setItem('acceso', result.type);
        navigate('/'); 
        break; 
      }
      case 304:{
        sessionStorage.setItem('auth', true);
        sessionStorage.setItem('acceso', result.type);
        navigate('/'); 
        break; 
      }
      case 400:{
        setDialogError(`Error en ${result.error.param}: ${result.error.msg}`);
        break;
      }
      default : {
        setDialogError(`Ocurrio un error en el servidor, las credenciales enviadas son invalidas, intente nuevamente mas tarde`)
        break;
      }
    }             
  }

  return (
    <Container fluid={true} >
      <div >
        <Row className="justify-content-center">
          <Col xs="auto">
            <h2>Iniciar Sesion</h2>
          </Col>   
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <FaUserAlt size="100"/>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Forms jsonfield={fieldLogin} jsonform={jsonLogin} jsonValidation={schemaLogin} submit={submit}/>
          </Col>
        </Row>
        <Row>
          <Col xs="auto">
            <p>{dialogError}</p>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default Login