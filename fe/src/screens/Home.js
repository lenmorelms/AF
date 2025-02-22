import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import Footer2 from "../components/reusables/Footer2";
import CallToAction from "../components/CallToAction";
import Tournaments from "../components/Tournaments";
import InfoSection from "../components/InfoSection";
import HeroSection from "../components/HeroSection";
import FooterMobile from "../components/reusables/FooterMobile";

const Home = ({ deviceType }) => {
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <div className="body">
                <HeroSection />
                <CallToAction />
                <Tournaments source="play" />
                <InfoSection deviceType={deviceType} />
            </div>
            {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
        </div>
    );
};

export default Home;