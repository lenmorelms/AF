import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import Footer2 from "../components/reusables/Footer2";
import TournamentHeader from "../components/reusables/TournamentHeader";
import TournamentNav from "../components/reusables/TournamentNav";
import { useParams } from "react-router-dom";
import FooterMobile from "../components/reusables/FooterMobile";

const Winners = ({ deviceType }) => {
    const { id } = useParams();
    return (
        <div>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <TournamentHeader tournamentId={id} />
            <TournamentNav tournamentId={id} />
            <div className="body">
                <h3 className="center">The Player with the most points will be the winner, in case of a tie the one at the top of the 
                    leaderboard will be assumed the winner
                </h3>
                {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
            </div>
        </div>
    );
};

export default Winners;