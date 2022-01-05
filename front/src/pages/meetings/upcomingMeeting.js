import React, {useState} from 'react';
import Navbar from '../../component/navBar'
import {Row, Container, Col} from 'react-bootstrap'
import { fieldSearchMetting } from '../../schemas/schemaField';
import { jsonSearchMetting } from '../../schemas/schemaForm';
import { schemaSearchMetting } from '../../schemas/schemaValidation';
import Forms from '../../component/form';
import Table from '../../component/table';
import {headMeeting} from '../../schemas/schemaHeadTable';
import {filterMeetingParticipate} from '../../utils/meeting.comm'
import { useNavigate } from "react-router-dom";

const UpcomingMetting = () => {

  const [meeting, setMeeting]=useState([{id:0, titulo:'', extra:''}])
  const navigate = useNavigate();

  const submitFilterMeetingParticipate= async(valores, {resetForm})=>{
    resetForm();
    console.log(valores)
    const {titulo, horario}= valores;
    const result= await filterMeetingParticipate({titulo:titulo, horario:horario});
    console.log(result)
    switch(result.status){
      case 200:{
        setMeeting(result.meeting.map((row)=>{
          return {
            id:row.id,
            titulo:row.asunto,
            extra:row.fecha_inicio
          }
        }))
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

  return (
    <Container fluid={true}>
      <Row>
        <Navbar stop={true}/>
      </Row>
      <br/><br/>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h2>Proximas Reuniones</h2>
        </Col>
      </Row>
      <br/>
      <Row className="justify-content-center">
            <Forms jsonfield={fieldSearchMetting} jsonform={jsonSearchMetting} jsonValidation={schemaSearchMetting} submit={submitFilterMeetingParticipate}/>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <Table 
          head={headMeeting}
          contend={meeting}
          onClickButton={(row)=>{navigate(`/reuniones/detail/${row.original.id}`)}}
          pagination={true}
          />
      </Row>
    </Container>
  )
}

export default UpcomingMetting;