import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useHistory, Link } from "react-router-dom";
import axios from "axios";

export default function MyNavbar(props) {
    let totalQuantity = 0;

    props.cartArray.forEach((cartItem) => {
        totalQuantity = totalQuantity + cartItem.quantity;
    });

    const history = useHistory();

    const logOut = () => {
        axios({
            method: "get",
            url:
                "https://port-3000-aincbootcampapi-ianrios529550.codeanyapp.com/api/auth/logout",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + props.token,
            },
        })
            .then(function (response) {
                props.removeToken();
                history.push("/");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Navbar sticky="top" className="myNav">
            <Container className="bg bg-transparent fs-5 fw-bold">
                <Navbar.Brand as={NavLink} to="/home">
                    <img
                        alt="Cat Steve's Logo"
                        src="./img/CatSteves.png"
                        width="210"
                        height="140"
                        className="d-inline-block align-top"
                    />{" "}
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link
                        activeClassName={"active"}
                        as={NavLink}
                        to="/catalogue"
                    >
                        Products
                    </Nav.Link>
                    <Nav.Link
                        activeClassName={"active"}
                        as={NavLink}
                        to="/Cart"
                    >
                        Cart: {totalQuantity} Items
                    </Nav.Link>
                </Nav>
                <Navbar.Toggle />
                {/* <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Welcome, <a href="#login">Andrew Mills</a>
                    </Navbar.Text>
                    <span style={{ paddingLeft: 8 }}></span>
                    <Nav>
                        <Nav.Link
                            activeClassName={"active"}
                            as={NavLink}
                            to="/login"
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse> */}
                <Nav.Link as={Link} to="/">
                    Home
                </Nav.Link>
                <Nav.Link as={Link} to="/newuser">
                    New User
                </Nav.Link>
                {props.token.length > 0 ? (
                    <Button variant="success" onClick={logOut}>
                        Logout
                    </Button>
                ) : null}
            </Container>
        </Navbar>
    );
}
