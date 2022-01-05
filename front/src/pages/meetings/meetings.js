import React, {useState, useEffect} from 'react';
import Navbar from '../../component/navBar';
import Table from '../../component/table';
import {headMeeting} from '../../schemas/schemaHeadTable';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Image from '../../component/image';
import Cards from '../../component/listCard';
import header from '../../img/investigation3.jpg';
import imagen from '../../img/chemistry.jpg';
import civil from '../../img/civil.jpg';
import programers from '../../img/computer.jpg';
import { fieldSearchMetting } from '../../schemas/schemaField';
import { jsonSearchMetting } from '../../schemas/schemaForm';
import { schemaSearchMetting } from '../../schemas/schemaValidation';
import Forms from '../../component/form';
import {recentMeeting, filterMeeting} from '../../utils/meeting.comm'

const Meetings = () => {

  const [meeting, setMeeting]= useState([{titulo:'', extra:''}]);
  const navigate = useNavigate();
  const [searchMeeting, setSearchhMeeting]= useState([{id:0, titulo:'', extra:''}]);

  const submitFilterMeeting= async(valores, {resetForm})=>{
    resetForm();
    console.log(valores)
    const {titulo, horario}= valores;
    const result= await filterMeeting({titulo:titulo, horario:horario});
    console.log(result)
    switch(result.status){
      case 200:{
        setSearchhMeeting(result.meeting.map((row)=>{
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

  const listRecentMeeting= async()=>{
    const result= await recentMeeting();
    console.log(result)
    switch(result.status){
      case 200:{
        setMeeting(result.meeting.map((row)=>{
          return {
            titulo:row.asunto,
            extra:row.fecha
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

  useEffect(()=>{
    listRecentMeeting();
        // eslint-disable-next-line
  },[])

  return (
    <Container fluid={true}>
      <Row>
        <Navbar/>
      </Row>
      <Row>
        <Image src={header} text="Reuniones entre investigadores" />
      </Row>
      <br/><br/>
      <Row>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis autem at laboriosam explicabo corrupti obcaecati dignissimos, assumenda odio alias asperiores earum aut quas voluptas reiciendis illo quo ab sapiente, totam culpa debitis dicta magnam sit nam. Repellendus dolore quasi debitis qui pariatur ea reiciendis voluptatum, impedit velit harum neque! Nemo aliquid sed numquam consequatur minima quos repellendus a suscipit libero aut dolorem voluptatem possimus placeat mollitia maxime sunt nihil, adipisci harum ipsum at officiis nisi accusamus? Soluta voluptas distinctio veniam corrupti, fuga quaerat perspiciatis alias omnis, dolorum officia vero exercitationem vitae hic nesciunt tenetur animi culpa eaque odio, ab ullam magnam accusantium aspernatur velit sequi. Ad quidem eligendi omnis ducimus repellendus. Nemo sint, vero quasi est qui officiis dicta quam, possimus, sunt odit omnis! Quo aperiam recusandae adipisci consequuntur molestias totam dolorem odio, excepturi facilis saepe quia vitae dicta asperiores, illo, architecto ipsa fugiat quod corporis. Officia similique distinctio ex numquam nobis consectetur quidem aspernatur recusandae nesciunt non. Dolore at adipisci animi modi totam obcaecati architecto omnis cum debitis tempora repellendus nam praesentium eius dolorem, earum, ab veniam maiores quo in. Dolorum suscipit adipisci repellat esse accusamus neque quidem exercitationem aliquid odit totam vel, aliquam quis libero, sequi laborum corporis. </p>
      </Row>
      <br/><br/>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h3>Proximas Reuniones</h3>
        </Col>
      </Row>
      <br/><br/>
      <Cards jsonCard={meeting}
        image={[imagen,civil,programers]}
      />
      <br/><br/>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h3>Buscador de Reuniones</h3>
        </Col>
      </Row>
      <br/><br/>
      <Forms jsonfield={fieldSearchMetting} jsonform={jsonSearchMetting} jsonValidation={schemaSearchMetting} submit={submitFilterMeeting}/>
      <br/>
      <Row className="justify-content-center">
          <Table 
          pagination={true}
          head={headMeeting}
          contend={searchMeeting}
          onClickButton={(row)=>{navigate(`/reuniones/detail/${row.original.id}`)}}
          />
      </Row>
      <br/><br/>
    </Container>
  )
}

export default Meetings