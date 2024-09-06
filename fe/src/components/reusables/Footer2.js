import  React from "react";
import { Link } from "react-router-dom";

const Footer2 = () => {
    return (
        <>
<div className="">
  <footer className="text-center text-white" style={{backgroundColor: "#1c1e4f"}}>
    <div className="container">
      <section className="mt-0">
        <div className="row text-center d-flex justify-content-center pt-5">
        <div className="col-md-2 p-1">
            <h6 className="text-uppercase font-weight-bold">
              <Link to="/contact" className="nav-item nav-item nav-link text-white">Contact</Link>
            </h6>
          </div>

          <div className="col-md-2 p-1">
            <h6 className="text-uppercase font-weight-bold">
              <Link to="/help" className="nav-item nav-item nav-link text-white">Help Center</Link>
            </h6>
          </div>

          <div className="col-md-2 p-1">
            <h6 className="text-uppercase font-weight-bold">
              <Link to="/terms-of-use" className="nav-item nav-item nav-link text-white">Terms of Use</Link>
            </h6>
          </div>

          <div className="col-md-2 p-1">
            <h6 className="text-uppercase font-weight-bold">
              <Link to="/how-it-works" className="nav-item nav-item nav-link text-white">How IT Works</Link>
            </h6>
          </div>

          <div className="col-md-2 p-1">
            <h6 className="text-uppercase font-weight-bold">
              <Link to="/privacy-policy" className="nav-item nav-item nav-link text-white">Privacy Policy</Link>
            </h6>
          </div>
        </div>
      </section>

      <hr className="my-5" />
      <section className="mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <p>
              Step into the pulse of African football with our dynamic sports predictor game! 
              Experience the thrill of predicting match outcomes in real-time, 
              tailored specifically for the vibrant world of Sports. 
              Whether you're a passionate fan or a casual observer, AfriPredictor offers 
              an immersive experience that keeps you engaged and informed. 
              Stay ahead of the curve, challenge friends, and dive into the excitement 
              of predicting the next big match. Join us now and become part of the action!
            </p>
          </div>
        </div>
      </section>
      <section className="text-center mb-5">
        <Link to="/" className="text-white me-4">
          <i className="fa fa-facebook-f" style={{}}></i>
        </Link>
        <Link to="/" className="text-white me-4">
          <i className="fa fa-twitter"></i>
        </Link>
        <Link href="/" className="text-white me-4">
          <i className="fa fa-instagram"></i>
        </Link>
      </section>
    </div>
    <div
         className="text-center p-3"
         style={{backgroundColor: "blue"}}
         >
       © 2024 Copyright:&nbsp;
      <Link to="/" className="nav-item nav-item">
        AfriPredictor
      </Link>
    </div>
  </footer>
</div>
        </>
    );
};

export default Footer2;