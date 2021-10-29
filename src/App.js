import React, { useState } from 'react'
import Shipping from "./pages/Shipping"
import Billing from "./pages/Billing"
import Home from "./pages/Home"
import Menu from "./components/Menu"
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

function App() {

    const [customer, setCustomer] = useState({})
    const [validated, setValidated] = useState(false)

    return (
        <Router>
            <Menu />
            <Switch>
                <Route path="/shipping">
                    <Shipping
                        customer={customer}
                        setCustomer={setCustomer}
                        validated={validated}
                        setValidated={setValidated}
                    />
                </Route>
                <Route path="/billing">
                    <Billing
                        customer={customer}
                        setCustomer={setCustomer}
                        validated={validated}
                        setValidated={setValidated}
                    />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
