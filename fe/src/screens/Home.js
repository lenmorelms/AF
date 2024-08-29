import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import Footer2 from "../components/reusables/Footer2";
import CallToAction from "../components/CallToAction";
import Tournaments from "../components/Tournaments";
import InfoSection from "../components/InfoSection";
import HeroSection from "../components/HeroSection";

const Home = ({ deviceType }) => {
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <div className="body">
                <HeroSection />
                <CallToAction />
                <Tournaments source="join" />
                <InfoSection deviceType={deviceType} />
            </div>
            <Footer2 />
        </div>
    );
};

export default Home;