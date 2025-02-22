import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import Footer2 from "../components/reusables/Footer2";
import Tournaments from "../components/Tournaments";
import FooterMobile from "../components/reusables/FooterMobile";

const JoinTournament = ({ deviceType }) => {
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <div className="body">
                <Tournaments source="play" />
                {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
            </div>
        </div>
    );
};

export default JoinTournament;