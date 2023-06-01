import React from 'react';

const Footer = ({ searchMessage, year }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <div className="footer-column">
            <h3>About Us</h3>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Our Blog</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Services</h3>
            <ul>
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Mobile Apps</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Connect</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="footer-row small">
          <div className="footer-column">
            {/* Use the year prop passed from App */}
            <p>&copy; {year} Avian Explorer. All Rights Reserved.</p>
          </div>
          {/* Conditionally render search message if it exists */}
          {searchMessage && <div className="footer-column"><p>{searchMessage}</p></div>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;