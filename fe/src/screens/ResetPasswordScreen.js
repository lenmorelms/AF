import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import ResetPassword from "../components/ResetPassword";
import Footer2 from "../components/reusables/Footer2";
import FooterMobile from "../components/reusables/FooterMobile";
const ResetPasswordScreen = ({ deviceType }) => {
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <div className="body">
                <ResetPassword/>
                {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
            </div>
        </div>
    );
};

export default ResetPasswordScreen;