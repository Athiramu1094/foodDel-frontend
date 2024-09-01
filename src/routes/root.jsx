import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { setUserLoggedIn } from "../features/login/loginSlice";
import { useLocation } from "react-router-dom";

const Root = () => {
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/checkUser`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(setUserLoggedIn(true));
      }) //req to backend to verify that user is loggedin or not using useeffect,to check if there is cookies or not.

      .catch((error) => {
      
        dispatch(setUserLoggedIn(false));
      });
  }, []);
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/signup" || location.pathname==="/cart" || location.pathname === "/menu" ||
    location.pathname.startsWith("/restaurant/")  ||     location.pathname.startsWith("/category/");
    console.log(location.pathname);

  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent default link behavior
    try {
      await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true }
      );
      dispatch(setUserLoggedIn(false)); // Update global state
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
                  <Link className="navlink" to="">
                    About us
                  </Link>
                </li>
                <li>
                  <Link className="navlink" to="">
                    Restaurants
                  </Link>
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
              <p>Discover the best food & drinks near you</p>
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
      <footer></footer>
    </>
  );
};

export default Root;
