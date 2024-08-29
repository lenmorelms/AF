import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for hamburger and X
import { Link, useNavigate } from 'react-router-dom';
import Image from '../reusables/Image';
import { isTokenValid, logoImage } from '../reusables/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/Actions';
import Loading from '../reusables/Loading';

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutData = useSelector((state) => state._logout);
  const { loading, success, data } = logoutData;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  useEffect(() => {
    if(success) navigate("/");
  }, [success, data, navigate]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mobile-navbar">
      <div className="mobile-navbar__header">
        <div className="mobile-navbar__logo">
          <Link to="/"> <Image src={logoImage} width={150} height={150} className="mobile-header-logo" /></Link>
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
            {isTokenValid() ? 
              // <li><a href="/signout">Signout</a></li>
              <button style={styles.loginButton} onClick={logoutHandler}>Signout</button> 
              :
              // <li><a href="/signin">Signin</a></li>
              <Link to="/signin"><button style={styles.loginButton}>Signin</button></Link>
            }
          </ul>
        </div>
      )}
    </div>
  );
};
const styles = {
  loginButton: {
    width: '100%',
    // backgroundColor: '#ecf0f1',
    backgroundColor: 'red',
    color: '#ecf0f1',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
  },
}
export default MobileHeader;