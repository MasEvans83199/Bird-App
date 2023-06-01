import React from 'react';
import '../styles/Home.css';

const Home = ({ searchTerm }) => {
  console.log('Printing a message from Home component!');
  return (
    <div className="home-container">
      <h1>Welcome to
        <span> Birds, etc.</span>
      </h1>
      <p>Here, you can learn and look at birds!</p>
      <p>Search term: {searchTerm}</p> {/* You can access searchTerm prop here */}
    </div>
  );
}

export default Home;