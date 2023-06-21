import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import '../styles/Navbar.css';
import defaultAvatar from '../assets/default_icon.png';

function Navbar({ title, links, session }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        if (session && session.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', session.user.id)
            .single();

          if (error) {
            throw error;
          }

          if (profile) {
            setAvatarUrl(profile.avatar_url);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAvatar();
  }, [session]);

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
            {avatarUrl ? (
              <img
                className="navbar-user-avatar"
                src={avatarUrl}
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
              <li className='drop-item'>
                <button className="navbar-dropdown-button" onClick={handleAuth}>
                  {session ? 'Sign Out' : 'Sign In'}
                </button>
              </li>
              <li className='drop-item'>{session && <Link to="/account">Account</Link>}</li>
            </ul>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
