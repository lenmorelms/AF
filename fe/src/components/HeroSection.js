import React from 'react';
import { heroImage } from './reusables/Functions';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: '50vh',
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    subheading: {
      fontSize: '1.5rem',
      marginBottom: '30px',
    },
    buttonContainer: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
    },
    button: {
      // backgroundColor: '#ffc72c',
      backgroundColor: 'gold',
      color: '#000',
      // padding: '15px 30px',
      padding: '10px 20px',
      // fontSize: '1rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    link: {
      color: 'white',
      fontSize: '1rem',
      textDecoration: 'underline',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container} className="homepage-hero">
      <div style={styles.heading}>The Ultimate Sports Predictor Gaming Platform</div>
      <div style={styles.subheading}>
        Join a league or start your own now!
      </div>
      <div style={styles.buttonContainer}>
        <Link to={`/tournaments`}><button style={styles.button}>JOIN A FREE LEAGUE</button></Link>
        <Link to={`/tournaments`}><button style={styles.button}>START A FREE LEAGUE</button></Link>
      </div>
    </div>
  );
};

export default HeroSection;


// import React from 'react';
// import { heroImage, heroLogoImage } from './reusables/Functions';
// import Image from './reusables/Image';

// const HeroSection = () => {
//   return (
//     <div style={styles.heroContainer}>
//       {/* <Image src={heroLogoImage} width={100} height={100} className="hero-logo" /> */}
//       <h1 style={styles.mainHeading}>The Ultimate Soccer Predictor Game</h1>
//       <p style={styles.subHeading}>Join a tournament and start predicting!</p>
//     </div>
//   );
// };

// const styles = {
//   heroContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundImage: `url(${heroImage})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     height: '50vh',
//     color: '#fff',
//     textAlign: 'center',
//   },
//   logo: {
//     width: '150px',
//     marginBottom: '20px',
//     paddingTop: '20px',
//   },
//   mainHeading: {
//     fontSize: '40px',
//     fontWeight: 'bold',
//     marginBottom: '10px',
//   },
//   subHeading: {
//     fontSize: '24px',
//   },
// };

// export default HeroSection;