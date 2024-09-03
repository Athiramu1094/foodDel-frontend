import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom';
import RestaurantCard from '../components/restaurantCard';

export async function loader() {
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/restaurant`)
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
    <section id='menu'>
    <h2 className='craving'>What are you craving for?</h2>
    <div className='menu'>
    <div className='menucard'>
        <Link to="/category/biriyani"><img src="/biriyani.png" alt="Biriyani"/></Link>
        <span>Biriyani</span>
    </div>
    <div className='menucard'>
        <Link to="/category/chicken"><img src="/chicken.png" alt="Chicken" /></Link>
        <span>Chicken</span>
    </div>
    <div className='menucard'>
        <Link to="/category/pizza"><img src="/pizza.png" alt="Pizza" /></Link>
        <span>Pizza</span>
    </div>
    <div className='menucard'>
        <Link to="/category/burger"><img src="/burger.png" alt="Burger" /></Link>
        <span>Burger</span>
    </div>
    <div className='menucard'>
        <Link to="/category/salad"><img src="/salad.png" alt="Salad" /></Link>
        <span>Salad</span>
    </div>
    <div className='menucard'>
        <Link to="/category/pastry"><img src="/pastry.png" alt="Pastry" /></Link>
        <span>Pastry</span>
    </div>
    <div className='menucard'>
        <Link to="/category/rolls"><img src="/rolls.png" alt="Rolls" /></Link>
        <span>Rolls</span>
    </div>
</div>
</section>
    
    <section id="restaurants">
    <h2>Our Top Restaurants</h2>
    <div className='restaurant-list'>
    {restaurants.map(restaurant => (
        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
    ))}
</div>
    </section>
    <section>
        <img className='app' src="./getApp.png" alt="" />
    </section>

    </main>
)
}

export default Home
