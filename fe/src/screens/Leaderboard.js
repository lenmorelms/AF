import React from "react";
import Header2 from "../components/Header2";
import MobileHeader from "../components/mobile/MobileHeader";
import TournamentHeader from "../components/reusables/TournamentHeader";
import TournamentNav from "../components/reusables/TournamentNav";
import LeaderboardCard from "../components/LeaderboardCard";
import Footer2 from "../components/reusables/Footer2";
import { useParams } from "react-router-dom";

const Leaderboard = ({ deviceType }) => {
  const { id } = useParams();
  const { team } = useParams() || null;
  const { leagueId } = useParams() || null;

  return (
    <div>
        <div className="heading">
            {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
        </div>
        <TournamentHeader tournamentName="ZIM PSL" />
        <TournamentNav tournamentId={id} />
        <div className="body">
            <LeaderboardCard tournamentId={id} team={team} leagueId={leagueId} />
            <Footer2 />
        </div>
    </div>
  );
};

export default Leaderboard;
