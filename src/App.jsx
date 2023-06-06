import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabase';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './static/Navbar';
import Footer from './static/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Birds from './pages/Birds';
import Photos from './pages/Photos';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import Account from './pages/Account';
import './App.css';

const App = () => {
  const links = [
    { title: 'Home', href: '/' },
    { title: 'Birds', href: '/birds' },
    { title: 'Photos', href: '/photos' },
    { title: 'Quiz', href: '/quiz' },
    { title: 'About', href: '/about' },
    { title: 'Account', href: '/account' },
  ];

  const [session, setSession] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  

  return (
    <BrowserRouter>
      <Navbar title="Avian Explorer" links={links} session={session} showDropdown= {showDropdown} handleToggleDropdown={handleToggleDropdown} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/birds" element={<Birds />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;