import React from "react";
import { Link } from "react-router-dom";
// import storeImage from "../assets/store-under-construction.png";

const Store = () => {
  return (
    <div className="construction-page">
      <h1>Coming Soon: AfriPredictor Store!</h1>
      {/* <img src={storeImage} alt="Store Under Construction" /> */}
      <p>Our AfriPredictor store is currently under construction. Soon, you’ll be able to purchase exclusive sports-related merchandise and more!</p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
      <style jsx>{`
        .construction-page {
          text-align: center;
          padding: 50px 20px;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        h1 {
          color: navy;
          margin-bottom: 20px;
        }
        p {
          font-size: 18px;
          color: gray;
          margin-bottom: 20px;
        }
        .btn-primary {
          background-color: #ffc300;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
        }
        .btn-primary:hover {
          background-color: #ffc300;
        }
      `}</style>
    </div>
  );
};

export default Store;
