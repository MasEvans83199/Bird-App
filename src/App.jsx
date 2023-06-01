import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';

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
  const history = createBrowserHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
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
    switch (window.location.pathname) {
      case '/':
        return <Home />;
      case '/birds':
        return <Birds />;
      case '/photos':
        return <Photos />;
      case '/quiz':
        return <Quiz />;
      case '/about':
        return <About />;
      case '/login':
        return <Login onLogin={handleLogin} />;
      default:
        return <h1>404 - Page not found</h1>;
    }
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar
          title="Avian Explorer"
          links={links}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/birds" element={<Birds  />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login  onLogin={handleLogin} />} />
          <Route component={() => <h1>404 - Page not found</h1>} />
        </Routes>
        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
};

export default App;