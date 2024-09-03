import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet , useNavigate } from "react-router-dom";
import { setUserLoggedIn } from "../features/login/loginSlice";
import { useLocation } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const Root = () => {
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
  const userId = useSelector((state) => state.login.user_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/checkUser`, { withCredentials: true })
      .then((response) => {
        const { success, user } = response.data;
        
        dispatch(setUserLoggedIn({ userLoggedIn: success, userId: user ? user._id : null }));
      })
      .catch((error) => {
        dispatch(setUserLoggedIn({ userLoggedIn: false, userId: null }));
      });
  }, [dispatch]);
  

  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/signup" || location.pathname==="/cart" || location.pathname === "/menu" ||
    location.pathname.startsWith("/restaurant/")  ||     location.pathname.startsWith("/category/") || location.pathname.startsWith("/aboutus") 
    || location.pathname.startsWith("/terms")  || location.pathname.startsWith("/privacyPolicy") || location.pathname === "/payment/success"
    ||location.pathname === "/payment/cancel" ;
    //console.log("Current pathname:", location.pathname);
    //console.log("Is header hidden?", hideHeader);

  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent default link behavior
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {},
        { withCredentials: true }
      );
      sessionStorage.clear();

      dispatch(setUserLoggedIn({ userLoggedIn: false, userId: null })); // Update global state
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {!hideHeader && (
        <header>
          <div className="navbar">
            <div className="logo">
              <Link to="/">
                {" "}
                <img className="logo" src="/Logo.png" alt="logo" />
              </Link>
            </div>
            <nav>
              <ul className="headerLinks">
                <li>
                  <Link className="navlink" to="/">
                    Home
                  </Link>
                </li>
                
                <li>
    <HashLink className="navlink" to="/#restaurants">
        Restaurants
    </HashLink>
</li>
                <li>
                  <Link to="/cart">
                    <span className="cart material-symbols-outlined">
                      shopping_bag
                    </span>
                  </Link>
                </li>
                {userLoggedIn ? (
                  <li>
                    <Link
                      onClick={handleLogout}
                      to="/logout"
                      className="navlink"
                    >
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/login" className="navlink">
                      Sign in
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
          <section>
            <div className="searchSection">
              <p >Discover the best food & drinks near you</p>
              <div className="searchBar">
                <span className="material-symbols-outlined searchIcon">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search for restaurants or dishes here"
                  aria-label="Search"
                />
              </div>
            </div>
          </section>
        </header>
      )}

      <main>
        <Outlet />
      </main>
      <footer>
        <div className="footer-container">
        <div className="footer-logo">
        <HashLink to="/#menu">
              <img className="logo" src="/logoYellow.png" alt="logo" />
              </HashLink>
          <span>@ Copyright 2024 FOODIKO. All rights Reserved.</span>
          <p>Welcome to our online order website! Here, you can browse our wide selection of products and place orders from the comfort of your own home.</p>
        </div>
        <div className="footer-links">
        <Link to="/aboutus" className="footerLink">
        About us
        </Link>
        <Link to="/terms" className="footerLink">
        Terms & Conditions
        </Link>
        <Link to="/privacyPolicy" className="footerLink">
        Privacy Policy
        </Link>
        </div>
        <div className="delivery-area">
          <h3>We deliver here</h3>
          <ul>
            <li>Maple Avenue</li>
            <li>Oak Street</li>
            <li>Pine Road</li>
            <li>Elmwood Drive</li>
            <li>Birch Street</li>
          </ul>
        </div>
        </div>
      </footer>
    </>
  );
};

export default Root;
