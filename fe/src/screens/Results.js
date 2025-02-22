import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import Footer2 from "../components/reusables/Footer2";
import TournamentHeader from "../components/reusables/TournamentHeader";
import TournamentNav from "../components/reusables/TournamentNav";
import Prediction from "../components/Prediction";
import { useParams } from "react-router-dom";
import FooterMobile from "../components/reusables/FooterMobile";
import CCCPrediction from "../components/CCCPrediction";
import CCCResult from "../components/CCCResult";

const Results = ({ deviceType }) => {
    const { id } = useParams();
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <TournamentHeader tournamentId={id} />
            <TournamentNav tournamentId={id} />
            <div className="body">
                {id==="67b3d570401a8b341590491a" ? <CCCResult deviceType={deviceType} tournamentId={id} /> : <Prediction deviceType={deviceType} tournamentId={id} />}
                {/* <Prediction deviceType={deviceType} tournamentId={id} /> */}
                {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
            </div>
        </div>
    );
};

export default Results;