import React from "react";

const Header = () => {
    return (
        <>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <span className="text-center font-weight-light my-4"></span>
            {/* Navbar Brand */}
            <a className="navbar-brand ps-3" href="index.html">AFRIPREDICTOR</a>
            {/* Sidebar Toggle */}
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="/!"><i claassName="fas fa-bars"></i></button>
            {/* Navbar Search */}
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i claassName="fas fa-search"></i></button>
                </div>
            </form>
            {/* Navbar */}
            <button className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">Logout</button>
        </nav>
        </>
    );
};

export default Header;