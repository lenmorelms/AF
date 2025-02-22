// src/screens/HomeScreen.js
import React from 'react';
import Header2 from '../components/Header2';
import MobileHeader from '../components/mobile/MobileHeader';
import Footer2 from '../components/reusables/Footer2';
import FooterMobile from '../components/reusables/FooterMobile';

const Help = ({ deviceType }) => {

  return (
    <>
    <div className="heading">
        {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
    </div>
    {/* <div className='homepage-hero'>
      <h1>HELP CENTER</h1>
    </div> */}
    <div className='terms-of-use'>
        <div className='container col-lg-8 p-3 pt-5'>
        <h1 className='red' style={{textAlign: "center", padding: "1rem"}}>
            HELP CENTER
        </h1>
        {/* <h3 className='red' style={{textAlign: "center", padding: "5rem"}}>
            Afripredictor Help Center
        </h3> */}
        <p>
            At Afripredictor, we're committed to ensuring your experience on our platform is seamless and enjoyable. 
            Our Help Center is here to assist you with any questions or issues you may encounter. 
            Below are some common topics to guide you through login, signup, tournaments, and how to play.
        </p>
        <b>Login</b><br /><br />
        <ul>
            <li>
                <b>Forgot Password:</b> If you've forgotten your password, simply click on the "Forgot Password" link on the login page and follow the instructions to reset it.
            </li>
            <li>
                <b>Account Locked:</b> If your account is locked, please contact our support team for assistance. We'll help you regain access to your account promptly.
            </li>
        </ul>

        <b>Signup</b><br /><br />
        <ul>
            <li>
                <b>Email Verification:</b> After signing up, you'll receive a verification email. If you haven't received it, please check your spam folder. If you still can't find it, contact us for further assistance.
            </li>
            <li>
                <b>Account Activation:</b> Make sure to complete the account activation process by following the link provided in the verification email. This step is crucial to accessing all features of <i>Afripredictor</i>.
            </li>
        </ul>

        <b>Tournaments</b><br /><br />
        <ul>
            <li>
                <b>Joining Tournaments:</b> Explore our range of tournaments and join those that interest you. Simply navigate to the Tournaments section, select the tournament you wish to join, and follow the prompts to participate.
            </li>
            <li>
                <b>Creating Tournaments:</b> Want to create your own tournament? Contact our support team for assistance in setting up a custom tournament tailored to your preferences.
            </li>
        </ul>

        <b>How To Play</b><br /><br />
        <ul>
            <li>
                <b>Predicting Matches:</b> To play, simply navigate to the tournament predictions page, select the match you want to predict, and enter your score or outcome prediction. Earn points based on the accuracy of your predictions and climb up the leaderboard.
            </li>
            {/* <li>
                <b>Scoring:</b> Points are awarded based on the accuracy of your predictions. The more accurate your prediction, the more points you earn. Keep track of your score on the leaderboard and compete with friends for bragging rights. 
                <b> For Soccer:</b> Predicting the exact score earns you 3 points, correct result 2 ponts and a close call erans you 1 point.
            </li> */}
            <li>
                <b>Scoring:</b> Points are awarded based on the accuracy of your predictions. The more accurate your prediction, the more points you earn. Keep track of your score on the leaderboard and compete with friends for bragging rights.
            </li>
            <li>
                <b>Halft Time Score:</b> Predicting the exact score earns you 3 points.
            </li>
            <li>
                <b>Full Time Score:</b> Predicting the exact score earns you 3 points, close result 2 ponts and the correct result earns you 1 point.
            </li>
            <li>
                <b>First Team To Score:</b> Correct outcome earns you 2 points.
            </li>
            <li>
                <b>First Goal Minutes:</b> Predicting the exact times earns you 5 points, a 3 minute minutes erans 3 points, while a 5 minutes difference earns a single point.
            </li>
            <li>
                <b>Corners:</b> Correct number of corners for each time earns you 3 points per team, close call 2 points and a correct result earns a single point.
            </li>
            <li>
                <b>Ball Possession:</b> Correct ball possession for each time earns you 5 points per team, close call 3 points and a correct result earns 2 points.
             </li>
        </ul>

        <p>
            For further assistance or inquiries, don't hesitate to reach out to our support team. 
            We're here to help you make the most out of your Afripredictor experience!
        </p>
        </div>
    </div>

    {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
    </>
  );
};

export default Help;