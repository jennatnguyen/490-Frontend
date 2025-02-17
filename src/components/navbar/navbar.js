import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      {/* Title on the left */}
      <Link to="/" className="title">Sakila</Link>

      {/* Hamburger icon */}
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation menu */}
      <ul className={menuOpen ? 'open' : ''}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/films" onClick={() => setMenuOpen(false)}>Films</Link>
        </li>
        <li>
          <Link to="/customers" onClick={() => setMenuOpen(false)}>Customers</Link>
        </li>
      </ul>
    </nav>
  );
};
