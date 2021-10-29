import React, { useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import statedata from '../data/statedata.json'

export default function Billing(props) {
    const history = useHistory()
    const handleChange = e => {
        props.setCustomer(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleClick = e => {
        props.setCustomer(prevState => ({
            ...prevState,
            [e.target.id]: e.target.checked
        }))

    }

    const load = () => {
        props.setCustomer(prevState => ({
            ...prevState,
            billing: false
        }))
        props.setValidated(false)
        console.log(props.customer.billing)
    }

    useEffect(load, [])

    const handleSubmit = e => {
        e.preventDefault();
        if (props.customer.billingFirstName && props.customer.billingFirstName.length > 3 &&
            props.customer.billingLastName && props.customer.billingLastName.length > 2 &&
            props.customer.billinAdddress && props.customer.billingAddress.length > 10 &&
            props.customer.billingCity && props.customer.billingCity.length > 3 &&
            props.customer.billingState && props.customer.billingState.length === 2 &&
            props.customer.billingZip && props.customer.billingZip.length === 5 &&
            props.customer.billingccNumber && props.customer.billingccNumber.length > 15 &&
            props.customer.billingSecurityCode && props.customer.billingSecurityCode.length > 2 &&
            props.customer.billingExpiration && props.customer.billingExpiration.length > 6) {
            props.setValidated(true)
            history.push("")          
        } else if (props.customer.firstName && props.customer.firstName.length > 3 &&
            props.customer.lastName && props.customer.lastName.length > 2 &&
            props.customer.address && props.customer.address.length > 10 &&
            props.customer.city && props.customer.city.length > 3 &&
            props.customer.state && props.customer.state.length === 2 &&
            props.customer.zip && props.customer.zip.length === 5 &&
            props.customer.shipping && props.customer.shipping > -1 &&
            props.customer.billingccNumber && props.customer.billingccNumber.length > 15 &&
            props.customer.billingSecurityCode && props.customer.billingSecurityCode.length > 2 &&
            props.customer.billingExpiration && props.customer.billingExpiration.length > 6) {
                props.setValidated(true)
                history.push("/")
            }
    }

    return (
        <Form className="p-3 m-3 border border-dark border-2" noValidate validated={props.validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" classname="checktext" label="Billing Address is the same as Shipping address!" id="billing" checked={props.customer.billing || ""} onClick={handleClick} />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label className="fw-bold">First Name</Form.Label>
                    <Form.Control type="name" placeholder="First Name" id="billingFirstName" value={props.customer.billing ? props.customer.firstName : (props.customer.billingFirstName || "")} onChange={handleChange} required />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className="fw-bold">Last Name</Form.Label>
                    <Form.Control type="name" placeholder="Last Name" id="billingLastName" value={props.customer.billing ? props.customer.lastName : (props.customer.billingLastName || "")} onChange={handleChange} required />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Address</Form.Label>
                <Form.Control placeholder="1234 Main St" id="billingAddress" value={props.customer.billing ? props.customer.address : (props.customer.billingAddress || "")} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" id="billingAddress2" value={props.customer.billing ? props.customer.address2 : (props.customer.billingAddress2 || "")} onChange={handleChange} required />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label className="fw-bold">City</Form.Label>
                    <Form.Control id="billingCity" value={props.customer.billing ? props.customer.city : (props.customer.billingCity || "")} onChange={handleChange} required />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label className="fw-bold">State</Form.Label>
                    <Form.Select defaultValue="Choose..." id="billingState" value={props.customer.billing ? props.customer.state : (props.customer.billingState || '')} onChange={handleChange} required >
                        <option>Choose...</option>
                        {statedata.map(state => <option>{state.abrev}</option>)}
                    </Form.Select>
                </Form.Group>

                {/*  value || "" */}

                <Form.Group as={Col}>
                    <Form.Label className="fw-bold">Zip</Form.Label>
                    <Form.Control id="billingZip" value={props.customer.billing ? props.customer.zip : (props.customer.billingZip || "")} onChange={handleChange} required />
                    <div className="invalid-feedback">Enter a Valid Zip Code</div>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} className="col-4">
                    <Form.Label className="fw-bold">Credit Card Number</Form.Label>
                    <Form.Control id="billingccNumber" value={props.customer.billingccNumber || ""} onChange={handleChange} required />
                </Form.Group>
                <Form.Group as={Col} className="col-4">
                    <Form.Label className="fw-bold">Security Code</Form.Label>
                    <Form.Control id="billingSecurityCode" value={props.customer.billingSecurityCode || ""} onChange={handleChange} required />
                </Form.Group>
                <Form.Group as={Col} className="col-4">
                    <Form.Label className="fw-bold">Expiration</Form.Label>
                    <Form.Control id="billingExpiration" placeholder="11/2222" value={props.customer.billingExpiration || ""} onChange={handleChange} required />
                </Form.Group>
            </Row>
            <Row className="border border-dark border-2  mb-3 ml-2 mr-2 p-2">
                <Col className="col-9 fw-bolder">Grand Total:</Col>
                <Col className="col-3 fw-bold">${props.customer.total}</Col>
            </Row>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit Order
            </Button>
        </Form>

    )
}


