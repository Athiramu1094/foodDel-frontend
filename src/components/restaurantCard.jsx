import React from 'react'
import { Link } from 'react-router-dom';
import './restaurantCard.css'; 

const RestaurantCard = ({restaurant}) => {
    
    return (
    <div className='restaurant-card'>
    <Link to={`/restaurant/${restaurant._id}`}>
    <article>
        <img src={restaurant.image} alt={restaurant.name} />
        <div className='name-rating'>
        <h3>{restaurant.name}</h3>
        <span>{restaurant.rating}</span>
        </div>
        <p>{restaurant.cuisine}</p>
        <p>{restaurant.address}</p>
        
    </article>
    </Link>
    </div>
)
}

export default RestaurantCard
