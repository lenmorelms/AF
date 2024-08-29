import React, { useState } from "react";
import MobileLeaguesHeader from "./mobile/MobileLeagueHeader";
import Leagues from "./Leagues";
import JoinLeague from "./JoinLeague";
import CreateLeague from "./CreateLeague";
import LeagueRanks from "./LeagueRanks";

const League = ({ tournamentId, deviceType }) => {

    const LeagueHeader = () => {
      const [showJoinLeague, setShowJoinLeague] = useState(false);
      const [showCreateLeague, setShowCreateLeague] = useState(false);

      const handleJoinClick = () => {
        setShowJoinLeague(true);
      };
      const handleCreateClick = () => {
        setShowCreateLeague(true);
      };

      const handleClose = () => {
        setShowJoinLeague(false);
        setShowCreateLeague(false);
      };
        return (
          <div className="leagues-header">
            <h1 className="leagues-header__title">Leagues</h1>
            <div className="leagues-header__buttons">
              <button
                className="leagues-header__button leagues-header__button--join"
                onClick={handleJoinClick}
              >
                Join a league
              </button>
              <button 
                className="leagues-header__button leagues-header__button--create"
                onClick={handleCreateClick}
              >
                <span className="plus-icon">+</span> Create a league
              </button>
            </div>
            {showJoinLeague && <JoinLeague onClose={handleClose} tournamentId={tournamentId} />}
            {showCreateLeague && <CreateLeague onClose={handleClose} tournamentId={tournamentId} />}
          </div>
        );
    };
    return (
        <div className="league-container vh">
            {/* <LeagueHeader /> */}
            {(deviceType=="phone") ? <MobileLeaguesHeader /> : <LeagueHeader />}
            <Leagues tournamentId={tournamentId} />
            <LeagueRanks tournamentId={tournamentId} />
        </div>
    );
};

export default League