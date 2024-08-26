import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom';
import RestaurantCard from '../components/restaurantCard';

export async function loader() {
    try{
        const response = await fetch('http://localhost:3000/restaurant')
        const restaurants =await response.json()
        return { restaurants:restaurants.data };
    }
    catch (error) {
        console.error('Failed to load restaurant:', error);
        return { restaurants: [] };
        
    }

}

const Home = () => {
    const {restaurants} = useLoaderData()

return (
    <main>
    <section>
    <h2>What are you craving for?</h2>
    <div className='menu'>
    <div className='menucard'>
        <Link to=""><img src="/biriyani.png" alt="Biriyani"/></Link>
        <p>Biriyani</p>
    </div>
    <div className='menucard'>
        <Link to=""><img src="/chicken.png" alt="Chicken" /></Link>
        <p>Chicken</p>
    </div>
    <div className='menucard'>
        <Link to=""><img src="/pizza.png" alt="Pizza" /></Link>
        <p>Pizza</p>
    </div>
    <div className='menucard'>
        <Link to=""><img src="/burger.png" alt="Burger" /></Link>
        <p>Burger</p>
    </div>
    <div className='menucard'>
        <Link to=""><img src="/salad.png" alt="Salad" /></Link>
        <p>Salad</p>
    </div>
    <div className='menucard'>
        <Link to=""><img src="/pastry.png" alt="Pastry" /></Link>
        <p>Pastry</p>
    </div>
    <div className='menucard'>
        <Link to=""><img src="/rolls.png" alt="Rolls" /></Link>
        <p>Rolls</p>
    </div>
</div>
</section>
    
    <section>
    <h2>Our Top Restaurants</h2>
    <div className='restaurant-list'>
    {restaurants.map(restaurant => (
        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
    ))}
</div>
    </section>

    </main>
)
}

export default Home
