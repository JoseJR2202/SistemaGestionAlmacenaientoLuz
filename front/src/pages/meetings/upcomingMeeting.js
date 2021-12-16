import React from 'react'
import Navbar from '../../component/navBar'
import {Row, Container, Col} from 'react-bootstrap'
import { fieldSearchMetting } from '../../schemas/schemaField';
import { jsonSearchMetting } from '../../schemas/schemaForm';
import { schemaSearchMetting } from '../../schemas/schemaValidation';
import Forms from '../../component/form';
import Table from '../../component/table';
import {headMeeting} from '../../schemas/schemaHeadTable';

const upcomingMetting = () => {
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
            <Forms jsonfield={fieldSearchMetting} jsonform={jsonSearchMetting} jsonValidation={schemaSearchMetting} submit={ (valores, {resetForm}) => {
                  resetForm();
                  console.log(valores);                
            }}/>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <Table 
          head={headMeeting}
          contend={[{
            id:1,
            titulo:"Reunion de prueba 1",
            extra:"xx/xx/xxxx xx:xx XM"
          },{
            id:7,
            titulo:"Reunion de prueba 2",
            extra:"xx/xx/xxxx xx:xx XM"
          },{
            id:3,
            titulo:"Reunion de prueba 3",
            extra:"xx/xx/xxxx xx:xx XM"
          },{
            id:4,
            titulo:"Reunion de prueba 5",
            extra:"xx/xx/xxxx xx:xx XM"
          }]}
          />
      </Row>
    </Container>
  )
}

export default upcomingMetting;