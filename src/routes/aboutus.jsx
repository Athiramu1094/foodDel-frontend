import React from 'react'
import Header from "./header";
import "./aboutus.css"

const Aboutus = () => {
    return (
    <div>
    <Header />
    <div className='about-container'> 
    <div>
        <img className='about-img' src="./aboutus.png" alt="" />
    </div>
    <div className='about-para'>
        <h2>Our Food Story</h2>
        <p>Welcome to Foodiko, where we bring delicious food right to your doorstep! Whether you’re craving a hearty meal, a quick snack, or something in between, we’ve got you covered. Our platform offers a curated selection of mouth-watering options, sourced from top restaurants and food providers.</p>
        <p>At Foodiko, we’re passionate about making your dining experience exceptional. With our easy-to-use website, secure payment options, and prompt delivery, you can enjoy high-quality food without any hassle.</p>
        <h3>Explore our food offerings and experience the convenience of Foodiko today!</h3>
    </div>
    </div>
    </div>
)
}

export default Aboutus
