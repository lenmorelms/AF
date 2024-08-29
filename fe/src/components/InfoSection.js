import React from 'react';
import { infoImage } from './reusables/Functions';

const InfoSection = ({ deviceType }) => {
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.title}>AfriPredictor is absolutely free!</h1>
        <ul style={styles.list}>


         <li><b>Predict & Win</b>: Test your knowledge and intuition by predicting match outcomes, and earn exciting rewards.</li>
         <li><b>Compete with Friends</b>: Create or join leagues to compete with friends and fellow sports enthusiasts.</li>
         {/* <li><b>Real-Time Updates</b>: Get instant updates on live scores, match results, and your predictions.</li> */}
         {/* <li><b>Personalized Stats</b>: Track your prediction performance with in-depth analysis and detailed leaderboards.</li> */}
         <li><b>Free to Play</b>: Enjoy full access to all prediction features without any fees or hidden charges.</li>
         {/* <li><b>Multiple Sports Available</b>: Predict matches across a wide variety of sports including football, rugby, and more.</li> */}
         <li><b>Easy to Use</b>: A simple and intuitive interface allows you to make predictions in just a few clicks.</li>
         {/* <li><b>Exciting Prizes</b>: Stand a chance to win real-world rewards and exclusive prizes for accurate predictions.</li> */}
         {/* <li><b>Stay Informed</b>: Access the latest sports news, match previews, and insights to help make informed predictions.</li> */}
         <li><b>Boost Your Credibility</b>: Climb the leaderboards and earn recognition for your sports expertise.</li>
        </ul>
      </div>
      {deviceType!=="phone" && (
        <div style={styles.imageContainer}>
        <img 
          src={infoImage}
          alt="Laptop" 
          style={styles.laptopImage} 
        />
      </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    // backgroundColor: '#003366', // Dark blue background color
    backgroundColor: 'blue',
    color: '#ffffff', // White text color
  },
  textContainer: {
    // width: '50%',
    paddingRight: '20px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    fontSize: '18px',
    lineHeight: '1.8',
  },
  imageContainer: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  laptopImage: {
    // height: '300px',
    // width: '60%',
    minWidth: '500px',
  },
  mobileImage: {
    width: '30%',
    maxWidth: '200px',
  },
};

export default InfoSection;