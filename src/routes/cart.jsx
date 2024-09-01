import React from 'react';
import Header from './header';
import { useSelector, useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity } from '../features/cart/cartSlice';
import { loadStripe } from '@stripe/stripe-js/pure';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

import './cart.css';

const Cart = () => {
    const items = useSelector((state) => state.cart.items);
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
    const userId = useSelector((state) => state.login.userId); 
    const restaurantId = useSelector((state) => state.restaurant.selectedRestaurantId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState("");
    
    const totalPrice = items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);


    

    const makePayment = async () => {
        if (!userLoggedIn) {
            // If the user is not logged in, redirect them to login or signup
            return navigate('/login?redirect=/cart');
        }

        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_publishable_key);

            const sanitizedItems = items.map((item) => ({
                _id: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            }));

            // Send sanitized data to the backend
            const response = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "post",
                data: { items: sanitizedItems },
            });

            const sessionId = response?.data?.sessionId;
            console.log(response, "=======response.data");

            const result = await stripe.redirectToCheckout({
                sessionId: sessionId,
            });

            if (result.error) {
                console.error("Stripe checkout error:", result.error.message);
            }
        } catch (error) {
            console.error("Payment error:", error.message);
        }
    };

    return (
        <main>
            <Header />
            {items.length === 0 ? (
                <div className="empty-cart">
                    <img className='emptycart-img' src="/emptycart.png" alt="Empty cart" />
                    <h3><span className='emptycart-span'>Oops!</span> <br/> Your cart looks empty...</h3>
                </div>
            ) : (
                
                <div className='cartPage-container'>
                    <div className='gif-and-form'>
                        <dotlottie-player
                            src="https://lottie.host/2e0e51e6-497e-421a-9939-5d4fb48b137e/fdDdcRKeQ3.json"
                            background="transparent"
                            speed="1"
                            style={{ width: '300px', height: '300px' }}
                            loop
                            autoplay
                        ></dotlottie-player>
                        <section className='delivery-section'>
                            <div className='home-address'>
                            <h4>Home</h4>
                            <span class="material-symbols-outlined">
                            garage_home
                            </span>
                            </div>
                            <form className="delivery-form">
                                <textarea id="details" className="addressdetails" placeholder="Name&Addr" required></textarea>
                            </form>
                            <button >Confirm Order</button>
                            <button onClick={makePayment}>Proceed to Payment</button>
                        </section>
                    </div>
            <div>
                <article className='cart-article'>
                        {items.map((item) => (
                            <div className='cart-container' key={item._id}>
                                <img className='food-img' src={item.image} alt={item.name} />
                                <div className='cart-details'>
                                    <h3>{item.name}</h3>
                                    <span>₹{item.price}</span>
                                </div>
                                <div className="quantity-controls">
                                    <button className='cartpage-btn' onClick={() => dispatch(decrementQuantity(item._id))}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className='cartpage-btn' onClick={() => dispatch(incrementQuantity(item._id))}>+</button>
                                </div>
                            </div>
                        ))}
                    </article>
                    
                    
                        <section>
                        <h3>Total Price ₹{totalPrice}</h3>
                        
                            <h2>Review your order and address details to avoid cancellations</h2>
                            <p>Note: If you cancel within 60 seconds of placing your order, a 100% refund will be issued. No refund for cancellations made after 60 seconds.</p>
                            <h3>Avoid cancellation as it leads to food wastage.</h3>
                        </section>
                    
                </div>
                </div>
            )}
        </main>
    );
};

export default Cart;
