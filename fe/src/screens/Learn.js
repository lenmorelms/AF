// src/screens/HomeScreen.js
import React from 'react';
import Footer2 from '../components/reusables/Footer2';
import Header2 from '../components/Header2';
import MobileHeader from '../components/mobile/MobileHeader';
import FooterMobile from '../components/reusables/FooterMobile';

const Learn = ({ deviceType }) => {

  return (
    <>
    <div className="heading">
        {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
    </div>
    {/* <div className='homepage-heror'>
      <h1>AfriPredictor: Experience the Excitement of Soccer Prediction</h1>
    </div> */}
    <div className='terms-of-use'>
        <div className='container col-lg-8 p-3 pt-5 '>
        <h1 className='red' style={{textAlign: "center", padding: "1rem"}}>
           Experience the Excitement of Soccer Prediction
        </h1>
        <h3 className='red' style={{textAlign: "center", padding: "2rem 0"}}>
            Join
        </h3>
        <p id='join'>
            Joining AfriPredictor is quick and easy! Simply navigate to our website and click on the Sign Up button to create your account. 
            You can sign up using your email address or social media accounts for seamless access. Once registered, you'll gain instant access to our platform, 
            where you can start predicting soccer match outcomes and participating in exciting competitions. Join the AfriPredictor community today and unleash your passion for soccer prediction!
        </p>

        <h3 className='red' style={{textAlign: "center", padding: "2rem 0"}}>
            Predict
        </h3>
        <p id='predict'>
            Predicting soccer match outcomes on AfriPredictor is an exhilarating experience! After signing in to your account, navigate to the prediction section 
            where you'll find a list of upcoming matches from various leagues. Select the match you want to predict, and enter your forecast for the final score, 
            match winner not later than the day before match kick off. Once you've made your predictions, sit back, relax, and await the match results. The more accurate your predictions, 
            the higher your chances of earning points and climbing the leaderboard. Get ready to showcase your soccer knowledge and prediction prowess on AfriPredictor!
        </p>

        <h3 className='red' style={{textAlign: "center", padding: "2rem 0"}}>
            Earn Points
        </h3>
        <p id='points'>
            Earning points on AfriPredictor is the key to success and recognition! As you make accurate predictions and participate in platform activities, you'll earn points that contribute to your overall score. 
            Points are awarded based on the accuracy of your predictions <span className="red">(exact scoreline - 3points, exact result - 2points, close call - 1point)</span>, with bonus points available for engaging in challenges and bonus activities. Keep track of your points on the leaderboard and compete against other users to claim the top spot. 
            With each prediction, you're not just showcasing your soccer expertise but also earning valuable points that enhance your standing in the AfriPredictor community. Start earning points today and become a true predictor champion on AfriPredictor!
        </p>
        </div>
    </div>
    {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
    </>
  );
};

export default Learn;