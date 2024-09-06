import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import ForgotPassword from "../components/ForgotPassword";
import Footer2 from "../components/reusables/Footer2";
import FooterMobile from "../components/reusables/FooterMobile";

const ForgotPasswordScreen = ({ deviceType }) => {
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <div className="body">
                <ForgotPassword />
                {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;