import React from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import "./cancel.css";

const Cancel = () => {
    return (
        <div>
            <Header />
            <div className="cancel-container">
                <dotlottie-player
                    src="https://lottie.host/e5967fea-9efc-4398-bf79-6fc524e17bd9/TYPUaHciTU.json"
                    background="transparent"
                    speed="1"
                    style={{ width: "300px", height: "300px" }}
                    loop
                    autoplay>
                </dotlottie-player>
                <h2>Your payment could not be processed. Please try again later.</h2>
                <Link to="/">Visit Home</Link>
            </div>
        </div>
    );
};

export default Cancel;
