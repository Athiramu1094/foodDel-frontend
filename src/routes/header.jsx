import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'

const Header = () => {
  return (
    <main>
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
            <Link className='navLInk2'  to="/about">
              About us
            </Link>
          </li>
          <li>
            <Link className='navLInk2'  to="/restaurants">
              Restaurants
            </Link>
          </li>
        </ul>
      </nav>
      </div>
    </main>
  );
};

export default Header;
