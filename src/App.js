import axios from "axios";
import MyNavbar from "../src/Components/MyNavbar";
import Home from "../src/Pages/Home";
import Catalogue from "../src/Pages/Catalogue";
import ShowItem from "./Pages/ShowItem";
import Cart from "../src/Pages/Cart";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        let newCart = cartArray.filter((item, i) => {
            if (item.id !== id) {
                return item;
            }
        });
        setCartArray(newCart);
    };
    useEffect(() => {
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
    }, [cartArray]);

    return (
        <>
            <Router>
                <MyNavbar cartArray={cartArray} />
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
                            <Login />
                        </Route>
                        <Route path="/newuser">
                            <NewUser />
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>
                        <Route path="/shipping">
                            <Shipping />
                        </Route>
                        <Route path="/billing">
                            <Billing />
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
