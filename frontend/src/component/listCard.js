import React from 'react'
import { Card, Col, Row} from 'react-bootstrap';
const listCard= ({jsonCard, image})=>{

    const cards=jsonCard.map((item, index)=>{
        return(
        <Col xs="auto" key={index}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image[index]} />
                <Card.Body>
                    <Card.Title>{item.titulo}</Card.Title>
                    <Card.Text>
                        {item.extra}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>    
      )
    });

    return (
        <Row className="justify-content-center">
            {cards}
        </Row>
        
    )

};

export default listCard;