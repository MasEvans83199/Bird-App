import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ title, links, isAuthenticated, onLogout }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (isAuthenticated) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      setShowDropdown(false);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onLogout();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const term = event.target[0].value.trim();
    onSearchSubmit(term);
  };

  return (
    <nav>
      <ul className="navbar-list">
        <li className="navbar-title">
          <img className='bird-logo' src='../src/images/bird_logo.png' alt='Bird Logo' />
          <Link to="/">{title}</Link>
        </li>
        {links.map((link, index) => (
          <li key={index} className="navbar-link">
            <Link to={link.href}>{link.title}</Link>
          </li>
        ))}
        <div className="navbar-user">
          <button className="navbar-user-button" onClick={handleToggleDropdown}>
            <FaUser /> 
          </button>
          {showDropdown && (
            <div className="navbar-dropdown">
              {!isLoggedIn && !isAuthenticated && (
                <Link to="/login">
                  <button className="navbar-dropdown-link">Sign In</button>
                </Link>
              )}
              {isLoggedIn && (
                <div>
                  <Link to="/account">
                    <button className="navbar-dropdown-link">View Account</button>
                  </Link>
                  <button className="navbar-dropdown-link" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;