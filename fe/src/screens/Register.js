import React from "react";
import Signup from "../components/Signup";
import Header2 from "../components/Header2";
import Footer2 from "../components/reusables/Footer2";
import MobileHeader from "../components/mobile/MobileHeader";
import FooterMobile from "../components/reusables/FooterMobile";

const Register = ({ deviceType }) => {
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <div className="body">
                <Signup />
                {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
            </div>
        </div>
    );
};

export default Register;