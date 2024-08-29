import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <>
        <div className="container" style={{ padding: "2rem" }}>
      <div className="row flex-container">
        {/* Column 1 */}
        <div md={4} className="col my-column component">
          <div className="text-center">
          <i className="fa fa-solid fa-user-plus" aria-hidden="true"></i>
            <h5>Join</h5>
            <p>
                To start playing first join a tournament of your choice and select the
                team of your choice.
            </p>
            <Link to="/learn">
              <button variant="light" className="Button rounded-pill">Lear More <i className="fa fa-exclamation-circle" aria-hidden="true"></i></button>
            </Link>
          </div>
        </div>

        {/* Column 2 */}
        <div md={4} className="col my-column component">
          <div className="text-center">
          <i className="fa fa-solid fa-balance-scale" aria-hidden="true"></i>
            <h5>Predict</h5>
            <p>
                Make your predictions and lock them before the games begin. Never miss a gameweek
            </p>
            <Link to="/learn">
              <button variant="light" className="Button rounded-pill">Lear More <i className="fa fa-exclamation-circle" aria-hidden="true"></i></button>
            </Link>
          </div>
        </div>

        {/* Column 3 */}
        <div md={4} className="col my-column component">
          <div className="text-center">
          <i className="fa fa-solid fa-cubes"></i> {/* Example icon */}
            <h3>Earn Points</h3>
            <p>
                Earn points based on the correctness of your predictions and watch yourself
                make strides on the leaderboard
            </p>
            <Link to="/learn">
              <button variant="light" className="Button rounded-pill">Learn More <i className="fa fa-exclamation-circle" aria-hidden="true"></i></button>
            </Link>
          </div>
        </div>
      </div>
        <div className="start-playing p-3" style={{ textAlign: "center" }}>
            <Link to="/tournaments">
              <button variant="light" className="Button rounded-pill">Start Playing <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
            </Link>
        </div>
    </div>
        </>
    );
};

export default CallToAction;