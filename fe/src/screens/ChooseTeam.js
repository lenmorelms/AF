import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import Teams from "../components/Teams";
import Footer2 from "../components/reusables/Footer2";
import FooterMobile from "../components/reusables/FooterMobile";

const ChooseTeam = ({ deviceType }) => {
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <div className="body">
                <Teams deviceType={deviceType} />
                {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
            </div>
        </div>
    );
};

export default ChooseTeam;