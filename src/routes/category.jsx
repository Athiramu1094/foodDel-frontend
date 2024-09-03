import React from "react";
import { useLoaderData } from "react-router-dom";
import Header from "./header";
import "./category.css";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom"; // Import Link

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

  const handleAddToCart = (food) => {
    const itemData = {
      ...food,
      restaurantId: food.restaurant,
    };
    sessionStorage.setItem(food._id, JSON.stringify(itemData));
    dispatch(addItemToCart(itemData));

    // Create the popup element
    const popup = document.createElement("div");
    popup.classList.add("cart-popup");

    // Add content to the popup
    popup.innerHTML = `
      <p>One item added to the cart. <span id="view-cart"></span></p>
    `;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Create and append the Link element
    const viewCartLink = document.createElement("a");
    viewCartLink.href = "/cart";
    viewCartLink.textContent = "View cart";
    viewCartLink.style.color = "#007bff"; // Optional: style the link
    viewCartLink.style.textDecoration = "underline"; // Optional: underline the link

    document.getElementById("view-cart").appendChild(viewCartLink);

    // Trigger the show animation
    requestAnimationFrame(() => {
      popup.classList.add("show");
    });

    // Automatically remove the popup after a few seconds
    setTimeout(() => {
      popup.classList.remove("show");
      setTimeout(() => popup.remove(), 500); // Remove after transition ends
    }, 3000);
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
                    <button onClick={() => handleAddToCart(food)}>
                      +
                    </button>
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
    </div>
  );
}

export default Category;
