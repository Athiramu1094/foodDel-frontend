import { useState, useEffect } from "react";
import Header from "./header";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  setCartItems, // Action to set items from session storage
} from "../features/cart/cartSlice";
import { loadStripe } from "@stripe/stripe-js/pure";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

import "./cart.css";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
  const userId = useSelector((state) => state.login.user_id);
  const restaurantId = items.length > 0 ? items[0].restaurantId : null;
  const [address, setAddress] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showCouponOptions, setShowCouponOptions] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionItems = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const item = JSON.parse(sessionStorage.getItem(key));
      if (item) sessionItems.push(item);
    }
    if (sessionItems.length) {
      dispatch(setCartItems(sessionItems)); // Load items from session storage into Redux
    }
  }, [dispatch]);

  useEffect(() => {
    // Update session storage whenever cart items change
    sessionStorage.clear();
    items.forEach((item) => {
      sessionStorage.setItem(item._id, JSON.stringify(item));
    });
  }, [items]);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const finalPrice = totalPrice - discount; // Calculate final price after discount

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const applyCoupon = (type) => {
    if (type === "10%" && totalPrice > 200) {
      setDiscount(totalPrice * 0.1);
      setCouponApplied(true);
      setCouponError("");
    } else if (type === "25%" && totalPrice > 500) {
      setDiscount(totalPrice * 0.25);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponApplied(false);
      setCouponError(type === "10%" ? "Coupon requires a minimum of ₹200" : "Coupon requires a minimum of ₹500");
    }
    setShowCouponOptions(false);
  };

  const toggleCouponOptions = () => {
    setShowCouponOptions(!showCouponOptions);
    setCouponApplied(false);
    setCouponError("");
  };

  const makePayment = async () => {
    if (!userLoggedIn) {
      return navigate("/login?redirect=/cart");
    }

    try {
      const createOrderResponse = await axiosInstance.post("/order/", {
        items,
        address,
        userId,
        restaurantId,
      });

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_publishable_key);
      const sanitizedItems = items.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await axiosInstance({
        url: "/payment/create-checkout-session",
        method: "post",
        data: { items: sanitizedItems },
      });

      const sessionId = response?.data?.sessionId;

      const result = await stripe.redirectToCheckout({ sessionId: sessionId });

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
          <img className="emptycart-img" src="/emptycart.png" alt="Empty cart" />
          <h3>
            <span className="emptycart-span">Oops!</span> <br /> Your cart looks empty...
          </h3>
        </div>
      ) : (
        <div className="cartPage-container">
          <div className="gif-and-form">
            <section className="delivery-section">
              <div className="home-form">
                <div className="home-address">
                  <h4>Home</h4>
                  <span className="material-symbols-outlined">garage_home</span>
                </div>
                <form className="delivery-form">
                  <textarea
                    id="details"
                    className="addressdetails"
                    placeholder="Name&Addr"
                    required
                    value={address}
                    onChange={handleAddressChange}
                  ></textarea>
                </form>
              </div>
              <button onClick={makePayment}>SAVE ADDRESS & PROCEED</button>
            </section>
          </div>
          <div className="item-price-coupon">
            <article className="cart-article">
              {items.map((item) => (
                <div className="cart-container" key={item._id}>
                  <img className="food-img" src={item.image} alt={item.name} />
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <span>₹{item.price}</span>
                  </div>
                  <div className="qnty-delete">
                    <div className="quantity-controls">
                      <button
                        className="cartpage-btn"
                        onClick={() => dispatch(decrementQuantity(item._id))}
                      >
                        -
                      </button>
                      <span>{item.quantity ? item.quantity : 1}</span>
                      <button
                        className="cartpage-btn"
                        onClick={() => dispatch(incrementQuantity(item._id))}
                      >
                        +
                      </button>
                    </div>
                    <button className="delete-btn" onClick={() => handleRemoveItem(item._id)}>
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </article>
            <section>
              <h3>Total Price ₹{totalPrice}</h3>

              {/* Coupon Section */}
              <div className="coupon">
                <span className="material-symbols-outlined">credit_card_heart</span>
                <button className="coupon-btn" onClick={toggleCouponOptions}>Apply Coupon</button>
              </div>

              {showCouponOptions && !couponApplied && (
                <div className="coupon-options">
                  <button className="offer-btn" onClick={() => applyCoupon("10%")}>
                    <span className="offer-name">FOODI10 | Apply Now</span><br />
                    10% off on orders above ₹200
                  </button>
                  <button className="offer-btn" onClick={() => applyCoupon("25%")}>
                    <span className="offer-name">FOODI25 | Apply Now</span><br />
                    25% off on orders above ₹500
                  </button>
                </div>
              )}

              {couponError && <p className="coupon-error">{couponError}</p>}

              {couponApplied && !couponError && (
                <div className="discount-summary">
                  <p className="coupon-applied">Coupon applied. You save ₹{discount.toFixed(2)}!</p>
                  <h4>You need to pay: ₹{finalPrice.toFixed(2)}</h4>
                </div>
              )}

              <div className="cancellation">
                <p>Review your order and address details to avoid cancellations</p>
                <h3>Avoid cancellation as it leads to food wastage.</h3>
              </div>
            </section>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
