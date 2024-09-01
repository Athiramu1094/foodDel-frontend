import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Header from './header';
import './category.css';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';

export async function loader({ params }) {
    const category = params.category;

    try {
        // Fetch food items based on category
        const foodResponse = await fetch(`http://localhost:3000/food?category=${category}`);
        const foodData = await foodResponse.json();
        
        // Fetch all restaurants
        const restaurantResponse = await fetch('http://localhost:3000/restaurant');
        const restaurantData = await restaurantResponse.json();

        // Create a map of restaurants by their IDs
        const restaurantMap = restaurantData.data.reduce((map, restaurant) => {
            map[restaurant._id] = restaurant;
            return map;
        }, {});

        return {
            foods: foodData.data || [],
            restaurants: restaurantMap
        };
    } catch (error) {
        console.error('Failed to load data:', error);
        return {
            foods: [],
            restaurants: {}
        };
    }
}

function Category() {
    const { foods, restaurants } = useLoaderData() || { foods: [], restaurants: {} };
    const dispatch = useDispatch()

    return (
        <div>
            <Header />
            <section>
                <div className="category-title">
                    <h1>{foods.length > 0 ? foods[0].category : 'Category'}</h1>
                </div>
                <div className="food-list">
                    {foods.map((food) => (
                        <div key={food._id} className="food-item">
                            <img src={food.mainImage} alt={food.name} className="foodImg" />
                            <div className='category-container'>
                            <div className='name-price'>
                            <h3>{food.name}</h3>
                            <div className='price-btn'>
                            <p>₹{food.price}</p>
                            <button onClick={()=>{dispatch(addItemToCart(food))}}>+</button>
                            </div>
                            </div>
                            <div className='restau-rating'>
                            <p>{restaurants[food.restaurant] ? restaurants[food.restaurant].name : 'Unknown'}</p>
                            <p className='rating'>{food.rating}</p>
                            
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
