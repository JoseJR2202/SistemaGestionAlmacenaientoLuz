import React, {useState, useEffect} from 'react'
import Navbar from '../../component/navBar'
import {Row, Container, Col} from 'react-bootstrap'
import Table from '../../component/table';
import {headProyect} from '../../schemas/schemaHeadTable';

const Request = () => {

    const [revise, setRevise]= useState();
    const [hold, setHold]= useState();

    useEffect(()=>{
        setRevise([{
            id:1,
            titulo:"Proyecto de prueba 1",
            extra:"Jose Jimenez"
        },{
            id:7,
            titulo:"Proyecto de prueba 2",
            extra:"Mario Gonzalez"
        },{
            id:3,
            titulo:"Proyecto de prueba 3",
            extra:"Genyelbert Acosta"
        },{
            id:4,
            titulo:"Proyecto de prueba 5",
            extra:"Anonimo X"
        }]);
        setHold([{
            id:1,
            titulo:"Proyecto de prueba 1",
            extra:"Jose Jimenez"
        },{
            id:7,
            titulo:"Proyecto de prueba 2",
            extra:"Mario Gonzalez"
        },{
            id:3,
            titulo:"Proyecto de prueba 3",
            extra:"Genyelbert Acosta"
        },{
            id:4,
            titulo:"Proyecto de prueba 5",
            extra:"Anonimo X"
        }])
    },[])

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
                head={headProyect}
                contend={revise}
                button={{
                    type:'dropdown',
                    options:["Revision","Aprobada","Negada"]
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
                head={headProyect}
                contend={hold}
                button={{
                    type:'dropdown',
                    title:'Espera',
                    options:["Revision","Aprobada","Negada"]
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