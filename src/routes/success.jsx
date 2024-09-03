import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import "./success.css"


const Success = () => {
    useEffect(() => {
        sessionStorage.clear(); 
    }, []);
    return (
        <div>
            <Header/>
            <div className="success-container">
            <dotlottie-player
                src="https://lottie.host/98539082-0fa9-4f5f-b744-09d56c620302/YRfnGlhLPe.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay>
            </dotlottie-player>
            <h2>Your Order Has Been Successfully Placed!</h2>
            <Link to="/">Explore More</Link>
            

            </div>
        </div>
    );
};

export default Success;
