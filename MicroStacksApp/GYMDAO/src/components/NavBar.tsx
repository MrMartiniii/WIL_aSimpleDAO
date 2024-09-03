import React from 'react';
import { Link } from 'react-router-dom';
import WeGymLogo from './WeGyGymDO.png';
import '../App.css';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <img src={WeGymLogo} alt="Site Logo" className="logo"></img>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/proposals">Proposals</Link>
        </li>
        <li>
          <Link to="/governance">Governance</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;