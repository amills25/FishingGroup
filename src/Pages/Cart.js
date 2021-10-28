import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cart(props) {
    return (
        <>
            <Container>
                <Row>
                    <Col className="text-center display-2 fw-bold">CART</Col>
                </Row>
            </Container>
            <br></br>
            {props.cartArray.length > 0 ? (
                <Container>
                    {props.cartArray.map((product, idx) => (
                        <Row
                            key={idx}
                            className="row-bordered align-items-center"
                        >
                            <Col>
                                <Image
                                    className="myImage"
                                    src={product.image}
                                ></Image>
                            </Col>
                            <Col>
                                <div className="fw-bold">{product.name}</div>
                                <br></br> Quantity: {product.quantity}
                            </Col>
                            <Col>
                                <Button
                                    as={Link}
                                    to={`/item/${product.id}`}
                                    variant="flush"
                                >
                                    View Item
                                </Button>
                                {" || "}
                                <Button
                                    variant="flush"
                                    onClick={() =>
                                        props.removeFromCart(product.id)
                                    }
                                >
                                    Remove from Cart
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <Row>
                        <Col className="text-center display-2">
                            <Button as={Link} to="/shipping" variant="dark">
                                CHECKOUT
                            </Button>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Container className="display-5 text-center">
                    <br></br>
                    YOUR CART IS EMPTY.
                </Container>
            )}
            <br></br>
        </>
    );
}
