import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMapMarkerAlt, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { checkTournIdAndReturnObject, findUserTeamAndLeagues, userData } from "./reusables/Functions";
import { useDispatch, useSelector } from "react-redux";
import { playerTournamentLeagueRanks } from "../redux/Actions";
import Loading from "./reusables/Loading";

const LeagueRanks = ({ tournamentId }) => {
  const dispatch = useDispatch();
  const leagueRanksData = useSelector((state) => state._leagueRanks);
  const { loading, data, error, success } = leagueRanksData;

  const leagues = findUserTeamAndLeagues(userData, tournamentId);  //playerTeam, matchingLeagues 

  useEffect(() => {
    dispatch(playerTournamentLeagueRanks(tournamentId, leagues.playerTeam, leagues.matchingLeagues));
  }, [dispatch]);
  useEffect(() => {
    if(success) console.log(data);
  }, [success, data]);
    const leagueRanks = [
        { name: "Overall", members: "2.13m+", rank: 625807, icon: faGlobe },
        { name: "Zimbabwe", members: "1k+", rank: 224, icon: faMapMarkerAlt }
    ];
    return (
        <div style={LeagueRankstyles.container}>
          {loading && <Loading />}
          {/* {success && console.log} */}
          <div style={LeagueRankstyles.header}>
            <p style={LeagueRankstyles.leagueLabel}>League</p>
            <p style={LeagueRankstyles.rankLabel}>Rank</p>
          </div>
          {leagueRanks.map((league, index) => (
            <div key={index} style={LeagueRankstyles.leagueRow}>
              <div style={LeagueRankstyles.leagueInfo}>
                <FontAwesomeIcon icon={league.icon} style={LeagueRankstyles.icon} />
                <div>
                  <p style={LeagueRankstyles.leagueName}>{league.name}</p>
                  <p style={LeagueRankstyles.members}>{league.members} members</p>
                </div>
              </div>
              <div style={LeagueRankstyles.rankInfo}>
                <p style={LeagueRankstyles.rank}>{league.rank.toLocaleString()}</p>
                <FontAwesomeIcon icon={faArrowUp} style={LeagueRankstyles.arrowIcon} />
              </div>
            </div>
          ))}
        </div>
    );
};

const LeagueRankstyles = {
    container: {
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '15px',
      maxWidth: '400px',
      margin: '0 auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      borderBottom: '1px solid #ddd',
      paddingBottom: '5px',
    },
    leagueLabel: {
      fontWeight: 'bold',
      color: '#777',
    },
    rankLabel: {
      fontWeight: 'bold',
      color: '#777',
    },
    leagueRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #ddd',
    },
    leagueInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: '10px',
      color: '#1a73e8',
      fontSize: '18px',
    },
    leagueName: {
      margin: 0,
      fontWeight: 'bold',
      color: '#333',
    },
    members: {
      margin: 0,
      color: '#777',
      fontSize: '14px',
    },
    rankInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    rank: {
      marginRight: '5px',
      fontWeight: 'bold',
      color: '#333',
    },
    arrowIcon: {
      color: '#34a853',
    },
  };
  
export default LeagueRanks;