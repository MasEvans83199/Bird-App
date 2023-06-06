import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import '../styles/Navbar.css';

function Navbar({ title, links, session }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  const handleAuth = async () => {
    if(session) {
      // Do logout through supabase.auth.signOut()
      const { error } = await supabase.auth.signOut();
      if (error) {
        // Handle sign-out error
      }
    } else {
      // Do login through supabase.auth.signIn()
      navigate('/login');
    }
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav>
      <ul className="navbar-list">
        <li className="navbar-title">
          <img className="bird-logo" src="../src/images/bird_logo.png" alt="Bird Logo" />
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
            <ul className="navbar-dropdown">
              <li>
                <button className="navbar-dropdown-button" onClick={handleAuth}>
                  {session ? 'Sign Out' : 'Sign In'}
                </button>
              </li>
            </ul>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;