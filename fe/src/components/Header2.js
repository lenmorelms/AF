import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValid, logoImage, userData } from './reusables/Functions';
import Image from './reusables/Image';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/Actions';
import Loading from './reusables/Loading';
import { FaChevronDown } from 'react-icons/fa';
import { SignedIn, SignedOut, SignInButton, UserButton, UserProfile } from "@clerk/clerk-react";

const Header2 = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown toggle
  const logoutData = useSelector((state) => state._logout);
  const { loading, success } = logoutData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  useEffect(() => {
    if (success) navigate("/");
  }, [success, navigate]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>
          <Link to="/"> 
            <Image src={logoImage} width={150} height={150} className="header-logo" />
          </Link>
        </div>
        <nav style={styles.nav}>
          <a href="/tournaments" style={styles.navLink}>Tournaments</a>
          <a href="/news" style={styles.navLink}>News</a>
          <a href="/store" style={styles.navLink}>store</a>
        </nav>
        <SignedIn>
            <UserButton />
        </SignedIn>
        <SignedOut>
             <SignInButton  redirectUrl="/tournaments" style={styles.loginButton} />
        </SignedOut>
      </header>
      {/* {loading && <Loading />} */}
    </>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 5rem',
    backgroundColor: '#1c1e4f',
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
    gap: '20px',
  },
  navLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '16px',
  },
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
    right: '0',
    backgroundColor: '#ecf0f1',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
    backgroundColor: '#e74c3c',
    color: '#ecf0f1',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Header2;

// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { isTokenValid, logoImage } from './reusables/Functions';
// import Image from './reusables/Image';
// import Button from './reusables/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../redux/Actions';
// import Loading from './reusables/Loading';

// const Header2 = () => {
//   const logoutData = useSelector((state) => state._logout);
//   const { loading, success, data } = logoutData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const logoutHandler = (e) => {
//     e.preventDefault();
//     dispatch(logout());
//   }

//   useEffect(() => {
//     if(success) navigate("/");
//   }, [success, data, navigate]);
//   return (
//     <>
//     <header style={styles.header}>
//       <div style={styles.logo}><Link to="/"> <Image src={logoImage} width={150} height={150} className="header-logo" /></Link></div>
//       <nav style={styles.nav}>
//         <a href="/tournaments" style={styles.navLink}>Tournaments</a>
//         <a href="/news" style={styles.navLink}>News</a>
//         <a href="/store" style={styles.navLink}>store</a>
//         <a href="/profile" style={styles.navLink}>Profile</a>
//       </nav>
//       {isTokenValid() ? 
//         <button style={styles.loginButton} onClick={logoutHandler}>Signout</button>
//         :
//         <Link to="/signin"><button style={styles.loginButton}>Signin</button></Link>
//       }
//     </header>
//     {loading && <Loading />}
//     </>
//   );
// };

// const styles = {
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '0 5rem',
//     backgroundColor: '#1c1e4f',
//     height: '60px',
//     margin: '0',
//   },
//   logo: {
//     fontSize: '24px',
//     color: '#ecf0f1',
//     fontWeight: 'bold',
//   },
//   nav: {
//     display: 'flex',
//     gap: '20px',
//   },
//   navLink: {
//     color: '#ecf0f1',
//     textDecoration: 'none',
//     fontSize: '16px',
//   },
//   loginButton: {
//     backgroundColor: '#e74c3c',
//     color: '#ecf0f1',
//     border: 'none',
//     padding: '8px 16px',
//     borderRadius: '30px',
//     cursor: 'pointer',
//     fontSize: '16px',
//   },
// };

// export default Header2;