import React, { useEffect, useState } from "react";
import LeagueInvite from "./LeagueInvite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMapMarkerAlt, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { checkTournIdAndReturnObject, findUserTeamAndLeagues, userData } from "./reusables/Functions";
import { useDispatch, useSelector } from "react-redux";
import { playerTournamentLeagues } from "../redux/Actions";
import Loading from "./reusables/Loading";

const Leagues = ({ tournamentId }) => {
  const dispatch = useDispatch();

  const yourLeaguesData = useSelector((state) => state._leagues);
  const { loading, data, error, success } = yourLeaguesData;

  useEffect(() => {
    dispatch(playerTournamentLeagues(tournamentId));
  }, [dispatch]);
// Your Leagues
    const YourLeagues = ({ leagueName, code, memberCounts}) => {
        const [isModalOpen, setModalOpen] = useState(false);

        const handleShare = () => {
            setModalOpen(true);
        };
        
        const closeModal = () => {
            setModalOpen(false);
        };
        return (
            <div style={styles.container}>
              <h1 style={styles.leagueName}>{leagueName}</h1>
              <p style={styles.subText}>{(memberCounts==0) && (!memberCounts) ? "No members" : memberCounts+" members" }</p>
              <p style={styles.inviteText}>To invite friends to this league, share the code</p>
              <h2 style={styles.code}>{code}</h2>
              <button style={styles.shareButton} onClick={handleShare}>Share</button>
              {/* <p style={styles.manageLink}>Manage league</p> */}

              {isModalOpen && <LeagueInvite code={code} link={`https://afripredictor.com/league/join/${code}`} onClose={closeModal} />}
            </div>
        );
    };
    return (
      <>
      <div className="heading" style={{ textAlign: "center" }}>Your Leagues</div>
        <div className="flex-container-wrap" style={{marginTop: "3rem"}}>
          {loading && <Loading />}
          {success && data.leagues.map((league) => (
            <div className="flex-league your-leagues-container">
              <YourLeagues leagueName={league.name} code={league.inviteLink} memberCounts={0} />
            </div>
          ))}
        </div>
      </>
    );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      height: '100%',
      margin: '0 auto',
    },
    leagueName: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      margin: '0',
    },
    subText: {
      color: '#777',
      margin: '5px 0 20px',
      alignItems: 'center',
    },
    inviteText: {
      color: '#555',
      marginBottom: '10px',
      alignItems: 'center',
    },
    code: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      letterSpacing: '2px',
      margin: '0 0 20px',
      height: '100%',
    },
    shareButton: {
      backgroundColor: '#1a73e8',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '20px',
    },
    manageLink: {
      color: '#1a73e8',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

export default Leagues;


// const YourTeam = () => {
//   const team = "Chelsea fc";
//   const playerTournaments = userData.tournaments;
//   const yourTeam = checkTournIdAndReturnObject(playerTournaments, tournamentId);
//   return (
//     <>
//       {yourTeam && (
//         <div style={styles.container}>
//           <h1 style={styles.leagueName}>{yourTeam.playerTeam}</h1>
//           <p style={styles.subText}>{yourTeam.tourName}</p>
//           <p style={styles.inviteText}>You are part of the {yourTeam.playerTeam} league</p>
//           <h2 style={styles.code}></h2>
//           <Link to={`/${tournamentId}/leaderboard/${(yourTeam.playerTeam).toLowerCase()}`}><button style={styles.shareButton}>View Leaderboard</button></Link>
//         </div>
//       )}
//     </>
//   );
// };