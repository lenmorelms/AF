import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValid, logoImage } from './reusables/Functions';
import Image from './reusables/Image';
import Button from './reusables/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/Actions';
import Loading from './reusables/Loading';

const Header2 = () => {
  const logoutData = useSelector((state) => state._logout);
  const { loading, success, data } = logoutData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  useEffect(() => {
    if(success) navigate("/");
  }, [success, data, navigate]);
  return (
    <>
    <header style={styles.header}>
      <div style={styles.logo}><Link to="/"> <Image src={logoImage} width={150} height={150} className="header-logo" /></Link></div>
      <nav style={styles.nav}>
        <a href="/tournaments" style={styles.navLink}>Tournaments</a>
        <a href="/news" style={styles.navLink}>News</a>
        <a href="/store" style={styles.navLink}>store</a>
      </nav>
      {isTokenValid() ? 
        // <Link to="!#"><button style={styles.loginButton} onClick={logoutHandler}>Signout</button></Link>
        <button style={styles.loginButton} onClick={logoutHandler}>Signout</button>
        :
        <Link to="/signin"><button style={styles.loginButton}>Signin</button></Link>
      }
      {/* <Link to="/signin"><button style={styles.loginButton}>Signin</button></Link> */}
    </header>
    {loading && <Loading />}
    </>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 5rem',
    backgroundColor: 'navy',
    height: '60px',
    margin: '0',
  },
  logo: {
    fontSize: '24px',
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '20px', // Space between navigation links
  },
  navLink: {
    color: '#ecf0f1', // Light color for the links
    // color: 'gold',
    textDecoration: 'none',
    fontSize: '16px',
  },
  loginButton: {
    // backgroundColor: '#ecf0f1',
    backgroundColor: 'red',
    color: '#ecf0f1',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Header2;