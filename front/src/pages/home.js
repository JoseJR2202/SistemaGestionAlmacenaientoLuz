import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../component/navBar';
import Image from '../component/image';
import Cards from '../component/listCard';
import header from '../img/investigation3.jpg';
import imagen from '../img/chemistry.jpg';
import civil from '../img/civil.jpg';
import programers from '../img/computer.jpg';
import { useNavigate } from "react-router-dom";
import { getRecentProyects } from '../utils/proyects.comm';

const Home = () => {
  const navigate = useNavigate();
  const [proyects, setProyects]= useState([{titulo:'', extra:''}]);

  const recentProyects= async()=>{
    const result= await getRecentProyects();
    console.log(result)
    switch(result.status){
      case 200:{
        setProyects(result.proyecto.map((row)=>{
          return {
            titulo:row,
            extra:"Jimnenez Jose, Mario Gonzalez"
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
    recentProyects()
    // eslint-disable-next-line
  }, [])
  
  return (
    <Container fluid={true}>
      <Row>
        <Navbar/>
      </Row>
      <Row>
        <Image src={header} text="Centro experimental de estudios Latinoamericano (CEELA)" />
      </Row>
      <br/><br/>
      <Row>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis autem at laboriosam explicabo corrupti obcaecati dignissimos, assumenda odio alias asperiores earum aut quas voluptas reiciendis illo quo ab sapiente, totam culpa debitis dicta magnam sit nam. Repellendus dolore quasi debitis qui pariatur ea reiciendis voluptatum, impedit velit harum neque! Nemo aliquid sed numquam consequatur minima quos repellendus a suscipit libero aut dolorem voluptatem possimus placeat mollitia maxime sunt nihil, adipisci harum ipsum at officiis nisi accusamus? Soluta voluptas distinctio veniam corrupti, fuga quaerat perspiciatis alias omnis, dolorum officia vero exercitationem vitae hic nesciunt tenetur animi culpa eaque odio, ab ullam magnam accusantium aspernatur velit sequi. Ad quidem eligendi omnis ducimus repellendus. Nemo sint, vero quasi est qui officiis dicta quam, possimus, sunt odit omnis! Quo aperiam recusandae adipisci consequuntur molestias totam dolorem odio, excepturi facilis saepe quia vitae dicta asperiores, illo, architecto ipsa fugiat quod corporis. Officia similique distinctio ex numquam nobis consectetur quidem aspernatur recusandae nesciunt non. Dolore at adipisci animi modi totam obcaecati architecto omnis cum debitis tempora repellendus nam praesentium eius dolorem, earum, ab veniam maiores quo in. Dolorum suscipit adipisci repellat esse accusamus neque quidem exercitationem aliquid odit totam vel, aliquam quis libero, sequi laborum corporis. </p>
      </Row>
      <br/><br/>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h3>Ultimos Proyectos de Investigacion</h3>
        </Col>
      </Row>
      <br/><br/>
      <Cards jsonCard={proyects}
        image={[imagen,civil,programers]}
      />
      <br/><br/>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h3>Ultimas Reuniones</h3>
        </Col>
      </Row>
      <br/><br/>
      <Cards jsonCard={[{
        titulo:"Reunion 1",
        extra:"Horario: xx/xx/xxxx xx:xx XM"
      },{
        titulo:"Reunion 2",
        extra:"Horario: xx/xx/xxxx xx:xx XM"
      },{
        titulo:"Reunion 3",
        extra:"Horario: xx/xx/xxxx xx:xx XM"
      }]}
        image={[imagen,civil,programers]}
      />
      <br/><br/>
    </Container>
  )
}

export default Home