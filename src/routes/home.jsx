import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import RestaurantCard from "../components/restaurantCard";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/restaurant`);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setRestaurants(data.data || []); // Set the restaurants from data.data array
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants.");
      }
    };

    fetchRestaurants();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <section id="menu">
        <h2 className="craving">What are you craving for?</h2>
        <div className="menu">
          <div className="menucard">
            <Link to="/category/biriyani">
              <img src="/biriyani.png" alt="Biriyani" />
            </Link>
            <span>Biriyani</span>
          </div>
          <div className="menucard">
            <Link to="/category/chicken">
              <img src="/chicken.png" alt="Chicken" />
            </Link>
            <span>Chicken</span>
          </div>
          <div className="menucard">
            <Link to="/category/pizza">
              <img src="/pizza.png" alt="Pizza" />
            </Link>
            <span>Pizza</span>
          </div>
          <div className="menucard">
            <Link to="/category/burger">
              <img src="/burger.png" alt="Burger" />
            </Link>
            <span>Burger</span>
          </div>
          <div className="menucard">
            <Link to="/category/salad">
              <img src="/salad.png" alt="Salad" />
            </Link>
            <span>Salad</span>
          </div>
          <div className="menucard">
            <Link to="/category/pastry">
              <img src="/pastry.png" alt="Pastry" />
            </Link>
            <span>Pastry</span>
          </div>
          <div className="menucard">
            <Link to="/category/rolls">
              <img src="/rolls.png" alt="Rolls" />
            </Link>
            <span>Rolls</span>
          </div>
        </div>
      </section>

      <section id="restaurants">
        <h2>Our Top Restaurants</h2>
        <div className="restaurant-list">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))
          ) : (
            <p>No restaurants available</p>
          )}
        </div>
      </section>
      <section>
        <img className="app" src="./getApp.png" alt="Download the App" />
      </section>
    </main>
  );
};

export default Home;
