import React from 'react'
import Navbar from '../../component/navBar'
import {Row, Container, Col} from 'react-bootstrap'
import { fieldProyect } from '../../schemas/schemaField';
import { jsonProyect } from '../../schemas/schemaForm';
import { schemaProyect } from '../../schemas/schemaValidation';
import Forms from '../../component/form';
import {insertProyect, fileProyect} from '../../utils/proyects.comm'
import {useNavigate } from "react-router-dom";

const PublicInvestigation = () => {

  const navigate = useNavigate();

  const submitProyect= async(valores, {resetForm})=>{
    resetForm();
    console.log(valores)
    const {archivo, autores, descripcion, titulo}= valores;
    const result= await insertProyect({titulo:titulo, descripcion:descripcion, autores:autores.split(',')});
    console.log(result)
    switch(result.status){
      case 200:{
        const result2= await fileProyect({data:archivo, id:result.proyecto.id_archivo});
        console.log(result2)
        if(result2.status===200){
          alert("proyecto publicado")
        }
        else
          alert("no funciono")
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
          <h2>Publicar Investigacion</h2>
        </Col>
      </Row>
      <br/>
      <Row className="justify-content-center">
          <Col xs="auto">
            <Forms jsonfield={fieldProyect} jsonform={jsonProyect} jsonValidation={schemaProyect} submit={submitProyect}/>
          </Col>
        </Row>
    </Container>
   
  )
}

export default PublicInvestigation;