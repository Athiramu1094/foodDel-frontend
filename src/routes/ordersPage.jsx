import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from "./header";
import './ordersPage.css'; 

const OrdersPage = () => {
  const userId = useSelector((state) => state.login.user_id); 
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/order?userId=${userId}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Could not fetch orders.');
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div>
      <Header />
      <div className="orders-page">
        <h1 className="orders-title">My Orders</h1>
        {error && <p className="error-message">{error}</p>}
        <ul className="orders-list">
          {orders.length > 0 ? (
            orders.map(order => (
              <li key={order._id} className="order-item">
                <div className="order-details">
                  <div className="order-info">
                    <p className="orders-restaurant-name">{order.restaurant.name}</p>
                    <p className="orders-total-amount">Total Amount: {order.totalAmount}</p>
                    <p className="order-status">Status: {order.status}</p>
                  </div>
                  <div className="ordered-items">
                    {order.order.map(item => (
                      <div key={item.food._id} className="ordered-item">
                        <p className="orders-food-name">{item.food.name}</p>
                        <img src={item.food.image} alt={item.food.name} className="food-image" />
                        <p className="orders-food-price">Price: {item.food.price}</p>
                        <p className="orders-food-quantity">Quantity: {item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OrdersPage;
