import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import '../styles/Navbar.css';
import Avatar from '../pages/Avatar';
import defaultAvatar from '../assets/default_icon.png';

function Navbar({ title, links, session }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (session) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        // Handle sign-out error
      }
    } else {
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
            {session?.user?.avatar_url ? (
              <img
                className="navbar-user-avatar"
                src={session.user.avatar_url}
                alt="User Avatar"
              />
            ) : (
              <img
                className="navbar-user-avatar"
                src={defaultAvatar}
                alt="Default Avatar"
              />
            )}
          </button>
          {showDropdown && (
            <ul className="navbar-dropdown">
              <li>
                <button className="navbar-dropdown-button" onClick={handleAuth}>
                  {session ? 'Sign Out' : 'Sign In'}
                </button>
              </li>
              <li>{session && <Link to="/account">Account</Link>}</li>
            </ul>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
