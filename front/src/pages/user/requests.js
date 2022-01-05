import React, {useState, useEffect} from 'react'
import Navbar from '../../component/navBar'
import {Row, Container, Col} from 'react-bootstrap'
import Table from '../../component/table';
import {headRequest} from '../../schemas/schemaHeadTable';
import {getProyectsStauts, changeStateProyect, deleteProyect} from '../../utils/proyects.comm';
import { useNavigate } from "react-router-dom";

const Request = () => {

    const navigate= useNavigate()
    const [revise, setRevise]= useState();
    const [hold, setHold]= useState();
    const [refresh, setRefresh]= useState(true);

    const changeState= async(option, id)=>{
        if(option==='Negada'){
            const result= await deleteProyect(id);
            switch(result.status){
                case 200:{
                    alert("Proyecto eliminado");
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
        else{
            const result= await changeStateProyect({id:id, option:option});
            switch(result.status){
                case 200:{
                    alert("Estado cambiado");
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
    }

    const getData= async()=>{
        const result= await getProyectsStauts();
        switch(result.status){
            case 200:{
              setRevise(result.proyecto.revision.map((row)=>{
                return {
                    id:row.id,
                    titulo:row.titulo,
                    extra:row.autor.toString()
                }
              }));
              setHold(result.proyecto.standby.map((row)=>{
                return {
                    id:row.id,
                    titulo:row.titulo,
                    extra:row.autor.toString()
                }
              }));
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
       getData();
        // eslint-disable-next-line
    },[refresh])

  return (
    <Container fluid={true}>
        <Row>
            <Navbar stop={true}/>
        </Row>
        <br/><br/>
        <Row className="justify-content-center">
            <Col xs="auto">
            <h2>Solicitudes</h2>
            </Col>
        </Row>
        <br/>
        {
            revise?
            <>
            <Row>
                <Col xs="auto">
                    <h2>En revision</h2>
                </Col>
            </Row>
            <br/>
            <Row className="justify-content-center">
                <Table 
                head={headRequest}
                contend={revise}
                pagination={true}
                onSelect={changeState}
                onClickButton={(row)=>{navigate(`/investigaciones/detail/${row.original.id}`)}}
                button={{
                    type:'dropdown',
                    options:["Revision","Aprobado","Negada"]
                }}
                />
            </Row>
            <br/>
            </>
            :
            <></>
        }
        {
            hold?
            <>
            <Row>
                <Col xs="auto">
                    <h2>En espera</h2>
                </Col>
            </Row>
            <br/>
            <Row className="justify-content-center">
                <Table 
                head={headRequest}
                contend={hold}
                pagination={true}
                onClickButton={(row)=>{navigate(`/investigaciones/detail/${row.original.id}`)}}
                onSelect={changeState}
                button={{
                    type:'dropdown',
                    title:'Espera',
                    options:["Revision","Aprobado","Negada"]
                }}
                />
            </Row>
            <br/>
            </>
            :
            <></>
        }
    </Container>
  )
}

export default Request;