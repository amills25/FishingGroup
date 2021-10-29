import React, { useState, useEffect } from 'react'
import { Form, Row, Button, Col, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import statedata from '../data/statedata.json'

export default function Shipping(props) {
    // const [state, setstate] = useState(initialState)
    const [shipping, setShipping] = useState([])
    const history = useHistory()

    const cart = [{ item: "Medium Fishing Pole", price: 58 }, { item: "Golden Reel", price: 131 }, { item: "Sping Jig", price: 221 }]

    let total = cart.map(item => item.price).reduce((previous, current) => previous + current);

    const digits_only = string => [...string].every(c => '0123456789'.includes(c));

    const zipValidation = () => {
        if (props.customer.zip) {
            if (digits_only(props.customer.zip) && props.customer.zip.length === 5) {
                return true
            } else {
                return false
            }
        }
    }

    const taxes = () => {
        let taxValue = statedata.reduce((prev, current) => {
            // console.log(prev)
            if (current.abrev === props.customer.state) {
                return current.tax + prev
            } return prev
        }, 0);
        let taxtotal = ((parseFloat(props.customer.shipping) + total) * taxValue)
        return taxtotal
    }

    const grandTotal = () => {
        let sum = ((parseFloat(props.customer.shipping) + total) + taxesValue).toFixed(2);
        props.setCustomer(prevState => ({
            ...prevState,
            total: sum
        }))
    }

    const apiCall = () => {
        axios.get("https://port-3000-aincbootcampapi-ianrios529550.codeanyapp.com/api/store/shippings")
            .then(function (response) {
                setShipping(response.data);
            })
            .catch(function (error) {
            })
            .then(function () {
            });
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(props.customer.firstName && props.customer.firstName.length > 3 &&
            props.customer.lastName && props.customer.lastName.length > 2 && 
             props.customer.address && props.customer.address.length > 10 &&
             props.customer.city && props.customer.city.length > 3 &&
             props.customer.state && props.customer.state.length === 2 &&
             props.customer.zip && props.customer.zip.length === 5 &&
             props.customer.shipping && props.customer.shipping > -1) {
                props.setValidated(true)
                history.push("/billing")
            }
        }

    const handleChange = e => {
        props.setCustomer(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value,
            
        }))
        // console.log(props.customer)
    }
    useEffect(apiCall, [])

    useEffect(grandTotal, [props.customer.shipping, props.customer.state, total])

    let taxesValue = taxes()
    // console.log({ taxesValue })

    return (
        <Form className="m-3 border border-dark border-2 p-3" noValidate validated={props.validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label className="fw-bold">First Name</Form.Label>
                    <Form.Control type="name" placeholder="First Name" id="firstName" value={props.customer.firstName || ""} onChange={handleChange} required />
                    <div className="invalid-feedback">Please enter your first name!</div>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label className="fw-bold">Last Name</Form.Label>
                    <Form.Control type="name" placeholder="Last Name" id="lastName" value={props.customer.lastName || ""} onChange={handleChange} required />
                    <div className="invalid-feedback">Please enter your last name!</div>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Address</Form.Label>
                <Form.Control placeholder="1234 Main St" id="address" value={props.customer.address || ""} onChange={handleChange} required />
                <div className="invalid-feedback">Please enter your address!</div>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" id="address2" value={props.customer.address2 || ""} onChange={handleChange} />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label className="fw-bold">City</Form.Label>
                    <Form.Control id="city" value={props.customer.city || ""} onChange={handleChange} required />
                    <div className="invalid-feedback">Please enter your city!</div>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label className="fw-bold">State</Form.Label>
                    <Form.Select defaultValue="Choose..." id="state" value={props.customer.state || ""} onChange={handleChange} required >
                        <option>Choose...</option>
                        {statedata.map(state => <option>{state.abrev}</option>)}
                    </Form.Select>
                    <div className="invalid-feedback">Please select a state!</div>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label className="fw-bold">Zip</Form.Label>
                    <Form.Control className={zipValidation() ? "is-valid" : "is-invalid"} id="zip" value={props.customer.zip || ""} onChange={handleChange} required />
                    <div className="invalid-feedback">Enter a Valid Zip Code!</div>
                </Form.Group>
            </Row>
            <Form.Group as={Col}>
                <Form.Label className="fw-bold">Shipping</Form.Label>
                <Form.Select id="shipping" value={props.customer.shipping || -1} onChange={handleChange}>
                    <option value={-1}>Choose Shipping...</option>
                    {shipping.map(item => <option value={item.cost}>{item.name} - ${item.cost}</option>)}
                </Form.Select>
            </Form.Group>
            <Container className="m-2 border border-dark border-2">
                <Row>
                    <Col className="fw-bolder col-9">Total:</Col>
                    <Col className="col-3 fw-bold">${total.toFixed(2)}</Col>
                </Row>
                <Row>
                    <Col className="fw-bolder col-9">Shipping:</Col>
                    <Col className="col-3 fw-bold">${parseFloat(props.customer.shipping).toFixed(2)}</Col>
                </Row>
                <Row>
                    <Col className="fw-bolder col-9">Taxes:</Col>
                    <Col className="col-3 fw-bold">${taxesValue.toFixed(2)}</Col>
                </Row>
                <Row>
                    <Col className="fw-bolder col-9"> Grand Total:</Col>
                    <Col className="col-3 fw-bold">${props.customer.total || 0}</Col>
                </Row>
            </Container>

            <Button variant="danger" className="m-2" onClick={handleSubmit}>
                Payment
            </Button>
        </Form>
    )
}

