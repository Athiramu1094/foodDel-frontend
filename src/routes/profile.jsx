import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './profile.css';
import Header from "./header";

const Profile = () => {
  const userId = useSelector((state) => state.login.user_id); 
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [popupMessage, setPopupMessage] = useState(''); // State for popup message

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        return; 
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/profile/${userId}`);
        setUserData(response.data.data); 
      } catch (err) {
        console.error(err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/profile/${userId}`, userData);
      setPopupMessage(response.data.message); // Set the message for the popup
      setShowPopup(true); // Show the popup

      // Automatically hide the popup after 3 seconds
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
    }
  };

  if (!userId) {
    return <div className="error-message">User ID is not available</div>; 
  }

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
       <Header />
       <div className="profile-container">
    <h2 className="profile-heading">User Profile</h2>
    
    {/* Conditional rendering of the popup */}
    {showPopup && (
      <div className="popup-message">
        <p>{popupMessage}</p>
      </div>
    )}

    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          className="form-input"
          value={userData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          className="form-input"
          value={userData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Gender:</label>
        <select
          name="gender"
          className="form-select"
          value={userData.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          className="form-input"
          value={userData.dob}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-button">Update Profile</button>
    </form>
  </div>
  </div>
);
    
};

export default Profile;
