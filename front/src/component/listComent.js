import React from 'react'
import { Card, Col, Row} from 'react-bootstrap';

const listComment= ({jsonComments})=>{

    const cards=jsonComments.map((item, index)=>{
        return(
        <div key={index}>
            <Row xs={1} >
                <Col>
                    <Card style={{ width: '100%'}}>
                        <Card.Header>{item.nombre}: {item.fecha}</Card.Header>
                        <Card.Body>
                            <Card.Text>{item.contenido}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>   
            </Row>
            <br/>
        </div>        
      )
    });

    return (
        <div>
            {cards} 
        </div>       
    )

};

export default listComment;