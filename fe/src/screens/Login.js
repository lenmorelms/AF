import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import Footer2 from "../components/reusables/Footer2";
import Signin from "../components/Signin";
import FooterMobile from "../components/reusables/FooterMobile";
import { SignIn } from '@clerk/react-router'

const Login = ({ deviceType }) => {
    return (
        <div>
            <div className="heading">
                {(deviceType==="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <div className="body">
                {/* <Signin /> */}
                <SignIn />
                {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
            </div>
        </div>
    );
};

export default Login;