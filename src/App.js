import React, { useState, useEffect } from "react";
import axios from "axios";
import MyNavbar from "./Components/MyNavbar";
import Home from "./Pages/Home";
import Catalogue from "./Pages/Catalogue";
import ShowItem from "./Pages/ShowItem";
import Cart from "./Pages/Cart";
import Dashboard from "./Pages/Dashboard";
import NewUser from "./Pages/NewUser";
import Login from "./Pages/Login";
import Shipping from "./Pages/Shipping";
import Billing from "./Pages/Billing";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

export default function App() {
    const [products, setProducts] = useState([]);
    const callAPI = () => {
        axios
            .get(
                "https://port-3000-aincbootcampapi-ianrios529550.codeanyapp.com/api/store/products"
            )
            .then((response) => {
                // handle success
                setProducts(response.data);
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };
    useEffect(callAPI, []);

    const [cartArray, setCartArray] = useState(
        JSON.parse(localStorage.getItem("cartArray")) || []
    );
    const addToCart = (id) => {
        setCartArray((prevCart) => {
            const cartItemIndex = cartArray.findIndex((item) => item.id === id);
            if (cartItemIndex !== -1) {
                const foundCartItem = cartArray[cartItemIndex];
                const newCartState = [...prevCart];
                newCartState[cartItemIndex] = {
                    ...foundCartItem,
                    quantity: foundCartItem.quantity + 1,
                };
                return newCartState;
            }
            const found = products.find((item) => item.id === id);
            const cartItem = { ...found, quantity: 1 };
            return [...prevCart, cartItem];
        });
    };
    const removeFromCart = (id) => {
        let newCart = cartArray.filter((item) => {
            if (item.id !== id) {
                return item;
            }
            return false;
        });
        setCartArray(newCart);
    };
    useEffect(() => {
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
    }, [cartArray]);

    const [token, setToken] = useState("");

    useEffect(() => {
        let lsToken = window.localStorage.getItem("token");
        if (lsToken) {
            setToken(lsToken);
        }
    }, []);

    const [customer, setCustomer] = useState({});
    const [validated, setValidated] = useState(false);

    const saveToken = (userToken) => {
        localStorage.setItem("token", userToken);
        setToken(userToken);
    };

    const removeToken = () => {
        localStorage.removeItem("token");
        setToken("");
    };

    return (
        <>
            <Router>
                <MyNavbar
                    cartArray={cartArray}
                    removeToken={removeToken}
                    token={token}
                />
                <div>
                    {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}

                    {/* current page */}
                    <Switch>
                        <Route path="/catalogue">
                            <Catalogue
                                products={products}
                                addToCart={addToCart}
                            />
                        </Route>
                        <Route path="/item/:id">
                            <ShowItem
                                products={products}
                                addToCart={addToCart}
                            />
                        </Route>
                        <Route path="/Cart">
                            <Cart
                                cartArray={cartArray}
                                removeFromCart={removeFromCart}
                            />
                        </Route>
                        <Route path="/login">
                            {token.length > 0 ? (
                                <Redirect to="/dashboard" />
                            ) : (
                                <Login saveToken={saveToken} />
                            )}
                        </Route>
                        <Route path="/newuser">
                            <NewUser saveToken={saveToken} />
                        </Route>
                        <Route path="/dashboard">
                            {token.length === 0 ? (
                                <Redirect to="/login" />
                            ) : (
                                <Dashboard token={token} />
                            )}
                        </Route>
                        <Route path="/shipping">
                            <Shipping
                                customer={customer}
                                setCustomer={setCustomer}
                                validated={validated}
                                setValidated={setValidated}
                                cartArray={cartArray}
                            />
                        </Route>
                        <Route path="/billing">
                            <Billing
                                customer={customer}
                                setCustomer={setCustomer}
                                validated={validated}
                                setValidated={setValidated}
                                token={token}
                            />
                        </Route>
                        <Route path={["/", "*"]}>
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    );
}
