import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function Dashboard(props) {
    const [dashboard, setDashboard] = useState({});

    useEffect(() => {
        axios({
            method: "get",
            url:
                "https://port-3000-aincbootcampapi-ianrios529550.codeanyapp.com/api/auth/user",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + props.token,
            },
        })
            .then(function (response) {
                // handle success
                setDashboard(response.data);
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(dashboard);

    return (
        <div className="text-center">
            <h2>Dashboard</h2>
            <br></br>
            <h3>
                Welcome{" "}
                {Object.keys(dashboard).length > 0 &&
                    dashboard.data.user_data.name}
                !
            </h3>
            <br></br>

            <DropdownButton
                variant="outline-secondary"
                title="Previous Orders"
                id="input-group-dropdown-1"
            >
                <div className="text-center">
                    <h5>Previous Orders</h5>
                    <h6>Item:</h6>
                    <p>Whopper Plopper</p>
                    <h6>Order Placed:</h6>
                    <p>{dashboard?.data?.user_data.created_at.split("T")[0]}</p>
                    <h6>Shipping:</h6>
                    <p>
                        {dashboard?.data?.user_data?.orders[0]?.shipping.name}
                    </p>
                </div>
            </DropdownButton>
        </div>
    );
}
