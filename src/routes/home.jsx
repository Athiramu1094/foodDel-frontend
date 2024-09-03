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
        <p>Biriyani</p>
    </div>
    <div className='menucard'>
        <Link to="/category/chicken"><img src="/chicken.png" alt="Chicken" /></Link>
        <p>Chicken</p>
    </div>
    <div className='menucard'>
        <Link to="/category/pizza"><img src="/pizza.png" alt="Pizza" /></Link>
        <p>Pizza</p>
    </div>
    <div className='menucard'>
        <Link to="/category/burger"><img src="/burger.png" alt="Burger" /></Link>
        <p>Burger</p>
    </div>
    <div className='menucard'>
        <Link to="/category/salad"><img src="/salad.png" alt="Salad" /></Link>
        <p>Salad</p>
    </div>
    <div className='menucard'>
        <Link to="/category/pastry"><img src="/pastry.png" alt="Pastry" /></Link>
        <p>Pastry</p>
    </div>
    <div className='menucard'>
        <Link to="/category/rolls"><img src="/rolls.png" alt="Rolls" /></Link>
        <p>Rolls</p>
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
