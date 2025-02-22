import React from 'react';
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    // <nav className="navbar">
    //   <div className="navbar__logo">
    //     <a href="/">
    //       <img src="path/to/logo.png" alt="Superbru Logo" />
    //     </a>
    //   </div>
    //   <ul className="navbar__links">
    //     <li><a href="/tournaments">Tournamentss</a></li>
    //     <li><a href="/news">News</a></li>
    //   </ul>
    //   <div className="navbar__user">
    //     <a href="/login" className="navbar__login">Login</a>
    //     <a href="/profile" className="navbar__profile">Profile</a>
    //   </div>
    // </nav>
    <div className="m-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    {/* <Logo fontWeight="400"/> */}
                    <a href="/">
                      <img src="path/to/logo.png" alt="Superbru Logo" />
                   </a>
                </Link>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">
                    <NavLink to="/tournaments" className="nav-item nav-item nav-link" activeClassName="active">Tournaments</NavLink>
                    <NavLink to="/news" className="nav-item nav-item nav-link" activeClassName="active">News</NavLink>
                </div>
                <div className="navbar-nav ms-auto nav-item dropdown">
                    <Link to="#!" className="dropdown-item" onClick="">Sign</Link>
                </div>
            </div>
            </div>
        </nav>
        </div>
  );
};

export default Header;
