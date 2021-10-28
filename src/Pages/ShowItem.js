import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Item(props) {
    const { id } = useParams();
    const oneItem = props.products.find((item) => item.id === parseInt(id));

    return (
        <>
            <Container>
                <Row>
                    <Col className="text-center display-2 fw-bold">
                        {oneItem?.name}
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Container className="text-center">
                <Row
                    xs={1}
                    md={3}
                    className="g-4 d-flex justify-content-center"
                >
                    <Col>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Img variant="top" src={oneItem?.image} />
                                <Card.Title>{oneItem?.name}</Card.Title>
                                <Card.Subtitle>${oneItem?.price}</Card.Subtitle>
                                <Card.Text>{oneItem?.description}</Card.Text>
                                <Button
                                    onClick={() => props.addToCart(oneItem.id)}
                                    variant="outline-dark"
                                >
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <br></br>
        </>
    );
}
