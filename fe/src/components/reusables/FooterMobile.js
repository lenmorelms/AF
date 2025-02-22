import React from "react";
import { Link } from "react-router-dom";

const FooterMobile = () => {
  return (
    <>
      <div className="footer-mobile">
        <footer className=" text-white" style={{ backgroundColor: "#1c134f" }}>
          <div className="container">
            <section className="mt-0">
              {/* Navigation Links */}
              <div className="footer-links pt-4 pb-3">
                <div className="footer-link-item mb-2">
                  <Link to="/contact" className="text-white footer-link">Contact</Link>
                </div>
                <div className="footer-link-item mb-2">
                  <Link to="/help" className="text-white footer-link">Help Center</Link>
                </div>
                <div className="footer-link-item mb-2">
                  <Link to="/terms-of-use" className="text-white footer-link">Terms of Use</Link>
                </div>
                <div className="footer-link-item mb-2">
                  <Link to="/how-it-works" className="text-white footer-link">How It Works</Link>
                </div>
                <div className="footer-link-item mb-2">
                  <Link to="/privacy-policy" className="text-white footer-link">Privacy Policy</Link>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="mb-2">
              <div className="">
                <p className="footer-about-text">
                  Step into the pulse of African football with our dynamic sports predictor game! 
                  Experience the thrill of predicting match outcomes in real-time, 
                  tailored specifically for the vibrant world of Sports. Whether you're a passionate 
                  fan or a casual observer, AfriPredictor offers an immersive experience that keeps 
                  you engaged and informed. Stay ahead of the curve, challenge friends, and dive into 
                  the excitement of predicting the next big match. Join us now and become part of the action!
                </p>
              </div>
            </section>

            {/* Social Icons */}
            <section className="text-center mb-4">
              <Link to="/" className="text-white me-4">
                <i className="fa fa-facebook-f"></i>
              </Link>
              <Link to="/" className="text-white me-4">
                <i className="fa fa-twitter"></i>
              </Link>
              <Link to="/" className="text-white me-4">
                <i className="fa fa-instagram"></i>
              </Link>
            </section>

          </div>

          {/* Copyright Section */}
          <div className="text-center p-3" style={{ backgroundColor: "blue" }}>
            © 2024 Copyright:&nbsp;
            <Link to="/" className="text-white">AfriPredictor</Link>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .footer-mobile {
          padding: 0px;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .footer-link-item {
          padding: 10px 0;
          font-size: 18px;
          border-bottom: 2px solid #fff;
        }
        .footer-link {
            text-decoration: none;
        }
        .footer-about-text {
          font-size: 14px;
          color: #fff;
          max-width: 500px;
          margin: 0 auto;
        }
        .fa {
          font-size: 20px;
        }
        @media (min-width: 768px) {
          .footer-about-text {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default FooterMobile;