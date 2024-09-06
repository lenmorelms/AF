// src/screens/HomeScreen.js
import React from 'react';
import Footer2 from '../components/reusables/Footer2';
import Header2 from '../components/Header2';
import MobileHeader from '../components/mobile/MobileHeader';
import FooterMobile from '../components/reusables/FooterMobile';

const HowITWorks = ({ deviceType }) => {

  return (
    <>
    <div className="heading">
        {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
    </div>
    {/* <div className='homepage-hero'>
      <h1>HOW IT WORKS</h1>
    </div> */}
    <div className='terms-of-use'>
        <div className='container col-lg-8 p-3 pt-5'>
        <h1 className='red' style={{textAlign: "center", padding: "1rem"}}>
            HOW IT WORKS
        </h1>
        {/* <h3 className='red' style={{textAlign: "center", paddingBottom: "5px"}}>
            How Afripredictor Works
        </h3> */}
        <p>
            AfriPredictor is a premier online sports predictor platform designed for soccer enthusiasts across Africa. 
            The platform offers users the exciting opportunity to engage in predicting the outcomes of soccer matches from various leagues within the continent and beyond. 
            Upon registering on AfriPredictor, users gain access to a dynamic interface where they can make predictions on upcoming matches, compete against fellow fans, and climb the ranks on the leaderboard.
        </p>
        <p>
            At AfriPredictor, the prediction process is simple yet engaging. Users can browse through a comprehensive list of upcoming matches across different leagues, 
            including popular African leagues such as the Premier Soccer League (PSL) and the CAF Champions League, among others. 
            Once a user selects a match, they can predict the final score, match winner, earning points based on the accuracy of their predictions.
        </p>

        <h3 className='red' style={{textAlign: "center", padding: "2rem 0"}}>
            What Afripredictor Offers
        </h3>
        <p>
            AfriPredictor offers a thrilling sports prediction experience coupled with competitive gameplay and interactive features. 
            Users can test their soccer knowledge and instincts by making predictions on a wide range of matches, from local derbies to international tournaments. 
            The platform fosters a sense of community among users, allowing them to compete in leagues, join private pools with friends, and engage in lively discussions about match outcomes and player performances.
        </p>
        <p>
            Furthermore, AfriPredictor provides users with valuable insights and statistics to inform their predictions, enhancing the overall experience 
            and increasing the likelihood of accurate forecasts. Whether you're a casual soccer fan or a seasoned pundit, AfriPredictor caters to all skill levels 
            and interests, offering a platform where passion for the game meets friendly competition. 
            Join AfriPredictor today to experience the thrill of predicting soccer matches and enjoy a unique online sports predictor experience tailored for African football fans.
        </p>
        </div>
    </div>
    {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
    </>
  );
};

export default HowITWorks;