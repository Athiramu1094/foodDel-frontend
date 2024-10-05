import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { setUserLoggedIn } from "../features/login/loginSlice";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Root = () => {
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
  const userId = useSelector((state) => state.login.user_id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const resultsRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/food/search?query=${query}`
      );
      const searchResults = response.data.slice(0, 2); // Limit to 2 results
      if (searchResults.length === 0) {
        setError("No items found.");
      } else {
        setResults(searchResults);
      }
    } catch (error) {
      console.log("Error search : => ", error);
    }
  };

  const handleClickOutside = (event) => {
    if (resultsRef.current && !resultsRef.current.contains(event.target)) {
      setResults([]); // For search result closing
    }
    const dropdown = document.querySelector(".dropdown-content");
    if (dropdown && !dropdown.contains(event.target) && !event.target.classList.contains("dropdown-button")) {
      setDropdownOpen(false); // Close dropdown on outside click
    }
  };

  useEffect(() => {
    // Fetch user data
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/checkUser`, {
        withCredentials: true,
      })
      .then((response) => {
        const { success, user } = response.data;
        dispatch(
          setUserLoggedIn({
            userLoggedIn: success,
            user_id: user ? user._id : null,
          })
        );
      })
      .catch((error) => {
        dispatch(setUserLoggedIn({ userLoggedIn: false, userId: null }));
      });

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/cart" ||
    location.pathname === "/menu" ||
    location.pathname.startsWith("/restaurant/") ||
    location.pathname.startsWith("/category/") ||
    location.pathname.startsWith("/aboutus") ||
    location.pathname.startsWith("/terms") ||
    location.pathname.startsWith("/privacyPolicy") ||
    location.pathname === "/payment/success" ||
    location.pathname === "/ordersPage" ||
    location.pathname === "/profile" ||
    location.pathname === "/payment/cancel";

  const hideFooter = location.pathname === "/profile" || location.pathname === "/ordersPage";

  const handleLogout = async (event) => {
    console.log("logout");
    event.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {},
        { withCredentials: true }
      );
      sessionStorage.clear();

      dispatch(setUserLoggedIn({ userLoggedIn: false, userId: null }));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {!hideHeader && (
        <header>
          <div className="navbar">
            <div className="logo">
              <Link to="/">
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
                  <li className="dropdown">
                    <button className="navlink dropdown-button" onClick={toggleDropdown}>
                      My Account
                      <span className="material-symbols-outlined drop-down">expand_more</span>
                    </button>
                    {dropdownOpen && (
                      <ul className="dropdown-content">
                        <li>
                          <Link className="navlink" to="/profile">
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="navlink" to="/ordersPage">
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <Link onClick={handleLogout} to="/logout" className="navlink">
                            Logout
                          </Link>
                        </li>
                      </ul>
                    )}
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
                <form onSubmit={handleSearch}>
                  <div className="searchBar-test">
                    <span className="material-symbols-outlined searchIcon">
                      search
                    </span>
                    <input
                      type="text"
                      value={query}
                      onChange={handleInputChange}
                      placeholder="Search for your dishes here"
                      aria-label="Search"
                    />
                  </div>
                </form>
              </div>
              {/* Search Results */}
              {error && <p className="error-message">{error}</p>}
              {results.length > 0 && (
                <div ref={resultsRef} className="searchResults">
                  <ul>
                    {results.map((item) => (
                      <li key={item._id} className="result-card">
                        <Link to={`/category/${item.category}`}>
                          <div className="result-content">
                            <img src={item.image} alt={item.name} className="result-image" />
                            <span>{item.name}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </header>
      )}

      <main>
        <Outlet />
      </main>
      {!hideFooter && (
        <footer>
          <div className="footer-container">
            <div className="footer-logo">
              <HashLink to="/#menu">
                <img className="logo" src="/logoYellow.png" alt="logo" />
              </HashLink>
              <span>@ Copyright 2024 FOODIKO. All rights Reserved.</span>
              <p>
                Welcome to our online order website! Here, you can browse our wide
                selection of products and place orders from the comfort of your
                own home.
              </p>
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
      )}
    </>
  );
};

export default Root;
