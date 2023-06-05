import React, { useState } from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (session) => {
    setIsAuthenticated(true);
    console.log(`${session.user.user_metadata.full_name} (${session.user.email}) has signed in.`);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAuthenticated(false);
      console.log('User has signed out.');
    } catch (error) {
      console.log(error.message);
    }
  };

  const links = [
    { title: 'Home', href: '/' },
    { title: 'Birds', href: '/birds' },
    { title: 'Photos', href: '/photos' },
    { title: 'Quiz', href: '/quiz' },
    { title: 'About', href: '/about' },
    { title: 'Account', href: '/account' },
  ];

  const getRouteComponent = () => {
    switch (window.location.path) {
        // Add routes here
    }
  };

  return (
    <BrowserRouter>
      <Navbar
        title="Birds"
        links={links}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout} // We're passing the handleLogout function as a prop here
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/birds" element={<Birds />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/account" element={<Account isAuthenticated={isAuthenticated} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;