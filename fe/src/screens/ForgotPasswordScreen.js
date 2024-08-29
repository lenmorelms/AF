import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import ForgotPassword from "../components/ForgotPassword";
import Footer2 from "../components/reusables/Footer2";

const ForgotPasswordScreen = ({ deviceType }) => {
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <div className="body">
                <ForgotPassword />
                <Footer2 />
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;