import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Header from "./header";
import "./menu.css";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";

export async function loader({ params }) {
  const restaurantId = params.id;

  try {
    const foodResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/food?restaurant=${restaurantId}`
    );
    const foodData = await foodResponse.json();

    const restaurantResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/restaurant/${restaurantId}`
    );
    const restaurantData = await restaurantResponse.json();

    return {
      foods: foodData.data || [],
      restaurant: restaurantData.data || {},
    };
  } catch (error) {
    console.error("Failed to load data:", error);

    return {
      foods: [],
      restaurant: {},
    };
  }
}

function Menu() {
  const { foods, restaurant } = useLoaderData() || {
    foods: [],
    restaurant: {},
  };
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = (food) => {
    const itemData = {
      ...food,
      restaurantId: food.restaurant,
    };
    sessionStorage.setItem(food._id, JSON.stringify(itemData));
    dispatch(addItemToCart(itemData));

    // Show the popup
    setShowPopup(true);

    // Automatically hide the popup after a few seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div>
      <Header />
      <section>
        <div className="restau-part">
          <div className="restau-details">
            <h1>{restaurant.name}</h1>
            <p>{restaurant.address}</p>
            <p>{restaurant.cuisine}</p>
            <div className="rating">
              <p>{restaurant.rating}</p>
              <span className="icon material-symbols-outlined">kid_star</span>
            </div>
            <div className="free-del">
              <p>Order above 500 for free delivery</p>
              <span className="icon material-symbols-outlined">fastfood</span>
            </div>
          </div>
          <div className="restau-img">
            <img src={restaurant.image} alt="" />
          </div>
        </div>
      </section>
      <section>
        <div className="food-part">
          {foods.map((food) => (
            <div key={food._id} className="menu-item">
              <div className="img-name-desc">
                <img src={food.image} alt={food.name} className="food-image" />
                <div className="name-description">
                  <h3>{food.name}</h3>
                  <p className="desc">{food.description}</p>
                </div>
              </div>
              <div className="food-details">
                <p>Rating: {food.rating}</p>
                <p>Price: ₹{food.price}</p>
                <button onClick={() => handleAddToCart(food)}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditional rendering of the popup */}
      {showPopup && (
        <div className="cart-popup show">
          <p>
            One item added to the cart.{" "}
            <Link to="/cart" style={{ color: "white", textDecoration: "underline" }}>
              View cart
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Menu;
