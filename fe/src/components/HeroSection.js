import React from 'react';
import { heroImage } from './reusables/Functions';
import { Link } from 'react-router-dom';
import CountDown from './CountDown';
import Team from './reusables/Team';
import { teamImage } from './reusables/Functions';

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
      color: 'gold',
    },
    buttonContainer: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
    },
    button: {
      // backgroundColor: '#ffc72c',
      // backgroundColor: 'goldenrod',
      backgroundColor: '#ffc300',
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
    },
    teamsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    team: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '14px',
    },
    vs: {
      display: 'flex',
      justifyContent: 'center', /* Centers horizontally */
      alignItems: 'center',
      color: 'gold',
      fontSize: '3rem',
    }
  };

  return (
    <div style={styles.container} className="homepage-hero">
      <div style={styles.heading}>
        The Ultimate Sports Predictor Gaming Platform
      </div>
      <div style={styles.subheading}>
        {/* Join a league or start your own now! */}
        SATURDAY 22 FEBRUARY 2025
      </div>
      <div style={styles.heroFixture}>
        <div style={styles.teamsContainer}>
          <div style={styles.team}>
            <Team
              logo={teamImage("zimbabwe", "dynamos")}
              logoWidth="80px"
              logoHeight="80px"
            />
          </div>
          <div style={styles.vs}><i>VS</i></div>
          <div style={styles.team}>
            <Team 
              logo={teamImage("zimbabwe", "simba-bhora")}
              logoWidth="80px"
              logoHeight="80px"
            />
          </div>
        </div>
      </div>
      {/* <CountDown /> */}
      <div style={styles.buttonContainer}>
        {/* <a href={`/tournaments`}><button style={styles.button}>JOIN A FREE LEAGUE</button></a> */}
        {/* <a href={`/tournaments`}><button style={styles.button}>START A FREE LEAGUE</button></a> */}
        <a href={`/tournaments`}><button style={styles.button}>PREDICT AND WIN</button></a>
      </div>
    </div>
  );
};

export default HeroSection;