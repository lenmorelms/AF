import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for hamburger and X
import { Link, useNavigate } from 'react-router-dom';
import Image from '../reusables/Image';
import { isTokenValid, logoImage, userData } from '../reusables/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/Actions';
import Loading from '../reusables/Loading';
import { FaChevronDown } from 'react-icons/fa';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, UserProfile } from "@clerk/clerk-react";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutData = useSelector((state) => state._logout);
  const { loading, success, data } = logoutData;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  useEffect(() => {
    if (success) navigate("/");
  }, [success, data, navigate]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle('no-scroll', !isOpen);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown
  };

  useEffect(() => {
    return () => {
      // Clean up the no-scroll class when component unmounts or menu closes
      document.body.classList.remove('no-scroll');
      // if(isOpen) {
      //   document.body.classList.add('no-scroll');
      // } else {
      //   document.body.classList.remove('no-scroll');
      // }
    };
  }, []);

  return (
    <div className="mobile-navbar">
      <div className="mobile-navbar__header">
        <div className="mobile-navbar__logo">
          <Link to="/"> 
            <Image src={logoImage} width={150} height={150} className="mobile-header-logo" />
          </Link>
        </div>
        <div className="mobile-navbar__icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </div>
      {loading && <Loading />}
      {isOpen && (
        <div className="mobile-navbar__menu">
          <ul className="mobile-navbar__links">
            <li><a href="/">Home</a></li>
            <li><a href="/tournaments">Tournaments</a></li>
            <li><a href="/news">News</a></li>
            <SignedIn>
              <SignOutButton style={styles.loginButton} />
            </SignedIn>
            <SignedOut>
                 <SignInButton style={styles.loginButton} />
            </SignedOut>
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  profileContainer: {
    position: 'relative',
  },
  profileButton: {
    backgroundColor: '#ecf0f1',
    color: '#1c1e4f',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center', // Align text and icon together
    gap: '8px', // Space between the profile text and icon
  },
  dropdownIcon: {
    fontSize: '12px', // Adjust size of the icon
  },
  dropdown: {
    position: 'absolute',
    top: '40px',
    left: '0',
    // backgroundColor: '#fff',
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '10px',
    zIndex: '100',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
    fontSize: '16px',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#e74c3c',
    color: '#ecf0f1',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  
}

export default MobileHeader;