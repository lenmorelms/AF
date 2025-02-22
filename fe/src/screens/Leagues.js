import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import Footer2 from "../components/reusables/Footer2";
import TournamentHeader from "../components/reusables/TournamentHeader";
import TournamentNav from "../components/reusables/TournamentNav";
import League from "../components/League";
import { useParams } from "react-router-dom";

const Leagues = ({ deviceType }) => {
    const { id } = useParams();
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <TournamentHeader tournamentName="ZIM PSL" />
            <TournamentNav tournamentId={id} />
            <div className="body">
                <League tournamentId={id} deviceType={deviceType} />
                <Footer2 />
            </div>
        </div>
    );
};

export default Leagues;