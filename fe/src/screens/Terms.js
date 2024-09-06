// src/screens/HomeScreen.js
import React from 'react';
import Header2 from '../components/Header2';
import Footer2 from '../components/reusables/Footer2';
import MobileHeader from '../components/mobile/MobileHeader';
import FooterMobile from '../components/reusables/FooterMobile';

const Terms = ({ deviceType }) => {

  return (
    <>
    <div className="heading">
        {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
    </div>
    {/* <div className='homepage-hero'>
      <h1>TERMS OF USE</h1>
    </div> */}
    <div className='terms-of-use'>
        <div className='container col-lg-8 p-3 pt-5'>
        <h1 className='red' style={{textAlign: "center", padding: "1rem"}}>
            TERMS OF USE
        </h1>
        {/* <h3 className='red' style={{textAlign: "center", padding: "5rem"}}>
            AfriPredictor Terms of Use
        </h3> */}

        <p>
            Welcome to AfriPredictor! These Terms of Use govern your use of our online sports predictor platform. 
            By accessing or using AfriPredictor, you agree to be bound by these terms. Please read them carefully before using our service.
        </p>

        <b>1. Acceptance of Terms</b>

        <p>
            By accessing or using AfriPredictor, you agree to abide by these Terms of Use. If you do not agree with any part of these terms, 
            you may not use our platform.
        </p>

        <b>2.User Eligibility</b>

        <p>
            You must be at least 18 years old to use AfriPredictor. By using our platform, you represent and warrant that you are at least 18 years 
            old and have the legal capacity to enter into these Terms of Use.
        </p>

        <b>3. Use of Service</b>

        <p>
            AfriPredictor provides an online sports prediction game where users can predict the outcomes of soccer matches from various leagues. 
            You agree to use our service only for lawful purposes and in accordance with these terms.
        </p>

        <b>4. User Accounts</b>

        <p>
            To participate in AfriPredictor, you may need to create a user account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. 
            You agree to accept responsibility for all activities that occur under your account.
        </p>

        <b>5. Intellectual Property</b>

        <p>
            All content on AfriPredictor, including text, graphics, logos, and images, is the property of AfriPredictor or its licensors and is protected by copyright and other 
            intellectual property laws. You may not use, modify, reproduce, or distribute any content from AfriPredictor without our prior written consent.
        </p>

        <b>6. Limitation of Liability</b>

        <p>
            AfriPredictor is provided on an "as is" and "as available" basis. We make no warranties or representations about the accuracy or completeness of 
            the content on our platform. In no event shall AfriPredictor be liable for any damages arising out of or in connection with your use of our service.
        </p>

        <b>7. Modification of Terms</b>

        <p>
            AfriPredictor reserves the right to modify or update these Terms of Use at any time without prior notice. Your continued use of our platform 
            after any such changes constitutes acceptance of the modified terms.
        </p>
       
        <b>8. Governing Law</b>

        <p>
            These Terms of Use shall be governed by and construed in accordance with the laws of your country, 
            without regard to its conflict of law provisions.
        </p>

        <b>9. Contact Us</b>

        <p>
            If you have any questions or concerns about these Terms of Use, please contact us at <a href="mailto:lmombe@zingaz.dev">info@zingaz.dev</a>.
        </p>

        </div>
    </div>
    {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
    </>
  );
};

export default Terms;