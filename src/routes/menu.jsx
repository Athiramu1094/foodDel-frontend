import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Header from './header';
import './menu.css'
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';

export async function loader({ params }) {
    const restaurantId = params.id;
    
    try {
        
        
        const foodResponse = await fetch(`http://localhost:3000/food?restaurant=${restaurantId}`);
        const foodData = await foodResponse.json();
        
    
        
        const restaurantResponse = await fetch(`http://localhost:3000/restaurant/${restaurantId}`);
        const restaurantData = await restaurantResponse.json();
        

        return {
            foods: foodData.data || [], 
            restaurant: restaurantData.data || {}
        };
    } catch (error) {
        console.error('Failed to load data:', error);
    
        return {
            foods: [],
            restaurant: {}
        };
    }
}

function Menu() {
    const { foods, restaurant } = useLoaderData() || { foods: [], restaurant: {} }; 
    const dispatch = useDispatch()
    

    return (
        <div>
            <Header />
            <section>
                <div className='restau-part'>
                <div className='restau-details'>
                <h1>{restaurant.name}</h1>
                <p>{restaurant.address}</p>
                <p>{restaurant.cuisine}</p>
                <div className='rating'>
                <p>{restaurant.rating}</p>
                <span class="icon material-symbols-outlined">
                    kid_star
                </span>     
                </div>
                <div className='free-del'>
                <p>Order above 500 for free delivery</p>
                <span className="icon material-symbols-outlined">
                    fastfood
                </span>
                </div>
                </div>
                <div className='restau-img'>
                    <img src={restaurant.image} alt="" />
                </div>
                </div>
            </section>
            <section>
                <div className='food-part'>
                {
                    foods.map(food => (
                        <div key={food._id} className='menu-item'>
                            <div>
                            <img src={food.image} alt={food.name} className='food-image' />
                            <p>{food.description}</p>
                            </div>
                            <div className='food-details'>
                            <h3>{food.name}</h3>
                            <p>Rating: {food.rating}</p>
                            <p>Price: ₹{food.price}</p>
                            <button onClick={()=>{dispatch(addItemToCart(food))}}>Add</button>
                            </div>
                        </div>
                    )
                ) 
                }
                </div>
            </section>
        </div>
    );
}

export default Menu;
