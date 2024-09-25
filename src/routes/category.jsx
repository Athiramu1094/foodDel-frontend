import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Header from "./header";
import "./category.css";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";

export async function loader({ params }) {
  const category = params.category;

  try {
    const foodResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/food?category=${category}`
    );
    const foodData = await foodResponse.json();

    const restaurantResponse = await fetch(`${import.meta.env.VITE_API_URL}/restaurant`);
    const restaurantData = await restaurantResponse.json();

    const restaurantMap = restaurantData.data.reduce((map, restaurant) => {
      map[restaurant._id] = restaurant;
      return map;
    }, {});

    return {
      foods: foodData.data || [],
      restaurants: restaurantMap,
    };
  } catch (error) {
    console.error("Failed to load data:", error);
    return {
      foods: [],
      restaurants: {},
    };
  }
}

function Category() {
  const { foods, restaurants } = useLoaderData() || {
    foods: [],
    restaurants: {},
  };
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = (food) => {
    const existingItem = sessionStorage.getItem(food._id);
    let itemData;

    if (existingItem) {
        itemData = JSON.parse(existingItem);
        itemData.quantity = (itemData.quantity || 1) + 1;
    } else {
        itemData = {
            ...food,
            restaurantId: food.restaurant,
            quantity: 1
        };
    }

    sessionStorage.setItem(food._id, JSON.stringify(itemData));
    dispatch(addItemToCart(itemData));

    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div>
      <Header />
      <section id="category-part" className="category-section">
        <div className="food-list">
          {foods.map((food) => (
            <div key={food._id} className="food-item">
              <img src={food.mainImage} alt={food.name} className="foodImg" />
              <div className="category-container">
                <div className="name-price">
                  <h3>{food.name}</h3>
                  <div className="price-btn">
                    <p>₹{food.price}</p>
                    <button onClick={() => handleAddToCart(food)}>+</button>
                  </div>
                </div>
                <div className="restau-rating">
                  <p>
                    {restaurants[food.restaurant]
                      ? restaurants[food.restaurant].name
                      : "Unknown"}
                  </p>
                  <p className="rating">{food.rating}</p>
                </div>
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

export default Category;
