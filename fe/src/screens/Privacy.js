// src/screens/HomeScreen.js
import React from 'react';
import Header2 from '../components/Header2';
import MobileHeader from '../components/mobile/MobileHeader';
import Footer2 from '../components/reusables/Footer2';
import FooterMobile from '../components/reusables/FooterMobile';

const Privacy = ({ deviceType }) => {

  return (
    <>
    <div className="heading">
        {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
    </div>
    {/* <div className='homepage-hero'>
      <h1>PRIVACY POLICY</h1>
    </div> */}
    <div className='terms-of-use'>
        <div className='container col-lg-8 p-3 pt-5'>
        <h1 className='red' style={{textAlign: "center", padding: "1rem"}}>
            PRIVACY POLICY
        </h1>
        <p>
            At Afripredictor, we prioritize the privacy and security of our users' personal information. 
            Our Privacy Policy outlines how we collect, use, and protect the data you provide when using our platform. 
            We are committed to maintaining transparency and ensuring your trust in how we handle your information. 
            By using Afripredictor, you consent to the practices described in this Privacy Policy
        </p>
        <h3 className='red' style={{textAlign: "center", padding: "2rem 0"}}>
            Key points covered in our Privacy Policy include:
        </h3>
        <ol>
            <li>
                <b>Information Collection:</b> We collect personal information such as name, email address, and location when you register and use our platform. 
                Additionally, we may collect non-personal information such as device information and website usage data.
            </li>
            <li>
                <b>Use of Information:</b> The data we collect is used to personalize your experience, administer contests and promotions, communicate with you, 
                and improve our services.
            </li>
            <li>
                <b>Data Security:</b> We employ industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
            </li>
            <li>
                <b>Third-party Disclosure:</b> We may share your information with trusted third parties for purposes such as payment processing, analytics, and marketing. However, we do not sell, 
                trade, or transfer your personal information to outside parties without your consent.
            </li>
            <li>
                <b>Cookie Policy:</b> We use cookies and similar technologies to enhance your browsing experience and gather information about how you interact with our website.
            </li>
            <li>
                <b>Opting Out:</b> You have the option to opt out of certain data collection and marketing communications. However, please note that opting out may limit your access to certain features of our platform.
            </li>
            <li>
                <b>Updates to Privacy Policy:</b> We may update our Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this policy periodically for any updates.
            </li>
        </ol>

        <p>
            By using Afripredictor, you acknowledge that you have read and understood our Privacy Policy. If you have any questions or concerns regarding our privacy practices, please contact us at <a href="mailto:lmombe@zingaz.dev">info@zingaz.dev</a>.
        </p>

        </div>
    </div>
    {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
    </>
  );
};

export default Privacy;