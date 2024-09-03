import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './header.css'

const Header = () => {
  return (
    <main className='header2'>
      <div className='navbar2'>
      <div>
        <Link to="/">
          <img className='logoYellow'  src="/logoYellow.png" alt="logo" />
         
        </Link>
      </div>
      <nav>
        <ul className='headerLinks2' >
          <li>
            <Link className='navLInk2'  to="/">
              Home
            </Link>
          </li>
        
          <li>
    <HashLink className="navLInk2" to="/#restaurants">
        Restaurants
    </HashLink>
</li>
            <li>
            <Link to="/cart">
                    <span className="cart-item material-symbols-outlined">
                      shopping_bag
                    </span>
                  </Link>
          </li>
        </ul>
      </nav>
      </div>
    </main>
  );
};

export default Header;
