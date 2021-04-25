import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <nav className="navigation-container">
      <ul className="navigation-items">
        <li className="navigation-item">
          <NavLink to="/list" activeStyle={{ fontWeight: 'bold' }}>
            List
          </NavLink>
        </li>
        <li className="navigation-item">
          <NavLink to="/add-item" activeStyle={{ fontWeight: 'bold' }}>
            Add Item
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
