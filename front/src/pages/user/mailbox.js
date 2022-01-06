import React,{useEffect, useState} from 'react'
import Navbar from '../../component/navBar'
import {Row, Container, Col} from 'react-bootstrap'
import Table from '../../component/table';
import {headMailBox} from '../../schemas/schemaHeadTable';
import {getCommentProyectsByUser} from '../../utils/proyects.comm';
import { useNavigate } from "react-router-dom";

const Mailbox = () => {
  
  const navigate= useNavigate();
  const [comments, setComments]= useState([{id:'', titulo:'', extra:''}]);

  const getComments= async()=>{
    const result= await getCommentProyectsByUser();
    switch(result.status){
      case 200:{
          setComments(
            result.comments.map((row)=>{
              return{
                id:row.id,
                titulo:row.titulo,
                extra:row.nombre
              }
            })
          )
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

  useEffect(()=>{
    getComments();
    // eslint-disable-next-line
  }, [])
  return (
    <Container fluid={true}>
        <Row>
            <Navbar stop={true}/>
        </Row>
        <br/><br/>
        <Row className="justify-content-center">
            <Col xs="auto">
            <h2>Buzon de comentarios</h2>
            </Col>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <Table 
          head={headMailBox}
          contend={comments}
          onClickButton={(row)=>{navigate(`/investigaciones/detail/${row.original.id}`)}}
          />
      </Row>
    </Container>
  )
}

export default Mailbox;