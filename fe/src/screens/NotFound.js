import React from 'react';
import { Link } from 'react-router-dom';
//import './NotFound.css';  // Add a separate CSS file for styling

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Page Not Found</h1>
      <p className="notfound-message">
        Oops! It looks like you’ve taken a wrong turn, just like missing that key prediction.
      </p>
      <p className="notfound-message">
        Don’t worry, you can still make a comeback! Head back to the homepage and predict your way to victory.
      </p>
      <Link to="/tournaments" className="notfound-link">Return to Home</Link>
      {/* <img
        src=""
        alt="Football miss"
        className="notfound-image"
      /> */}
    </div>
  );
};

export default NotFound;
