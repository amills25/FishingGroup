import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Catalogue(props) {
    return (
        <>
            <Container>
                <Row>
                    <Col className="text-center display-2 fw-bold">
                        OUR PRODUCTS
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Container className="text-center">
                <Row xs={1} md={4} className="g-4">
                    {props.products.map((product, idx) => (
                        <Col key={idx}>
                            <Card className="h-100">
                                <Card.Img
                                    className="myCard"
                                    variant="top"
                                    src={product.image}
                                />
                                <Card.Body className="cardAlign">
                                    <Card.Title>{product.name}</Card.Title>{" "}
                                    <Card.Subtitle>
                                        ${product.price}
                                    </Card.Subtitle>
                                    {/* <Card.Text>{product.description}</Card.Text> */}
                                    <br></br>
                                    <div>
                                        <Button
                                            as={Link}
                                            to={`/item/${product.id}`}
                                            variant="flush"
                                            // className="card-bottom"
                                        >
                                            View Item
                                        </Button>
                                        {" || "}
                                        <Button
                                            onClick={() =>
                                                props.addToCart(product.id)
                                            }
                                            variant="flush"
                                            // className="card-bottom"
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <br></br>
        </>
    );
}
