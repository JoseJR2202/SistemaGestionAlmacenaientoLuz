import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FaUserAlt } from 'react-icons/fa';
import { fieldLogin } from '../../schemas/schemaField';
import { jsonLogin } from '../../schemas/schemaForm';
import { schemaLogin } from '../../schemas/schemaValidation';
import Forms from '../../component/form'
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate= useNavigate();

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
            <Forms jsonfield={fieldLogin} jsonform={jsonLogin} jsonValidation={schemaLogin} submit={ (valores, {resetForm}) => {
                  resetForm();
                  console.log(valores);
                  sessionStorage.setItem('auth', true);
                  sessionStorage.setItem('acceso','Usuario')
                  navigate('/');                  
            }}/>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default Login