import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tournamentLeagueTable, tournamentTable, tournamentTeamTable } from "../redux/Actions";
import Loading from "./reusables/Loading";

const pageSize = 25;

const LeaderboardCard = ({ deviceType, tournamentId, team, leagueId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const leaderboardData = useSelector((state) => state._tournamentTable);
  const { data, loading, error, success } = leaderboardData;

  useEffect(() => {
    if (team) {
      dispatch(tournamentTeamTable(tournamentId, team));
    } else if (leagueId) {
      dispatch(tournamentLeagueTable(tournamentId, leagueId));
    } else {
      dispatch(tournamentTable(tournamentId));
    }
  }, [dispatch, tournamentId]);

  const playersData = data
    ? data.map((player) => ({
        rank: player.position,
        name: player.username,
        predictions: player.predicted,
        exact:  player.correctScore,
        result: player.correctResult,
        close: player.closeResult,
        points: player.totalPoints,
        // points: [player.correctResult, player.closeResult, player.correctScore, player.totalPoints],
      }))
    : [];

  const totalPages = Math.ceil(playersData.length / pageSize);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const currentPlayers = playersData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const styles = {
    leaderboardContainer: {
      // margin: "20px",
      padding: "20px",
      // backgroundColor: "#ffffff",
      // borderRadius: "8px",
      // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    leaderboardTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    tableHeaderCell: {
      padding: "8px",
      borderBottom: "1px solid #dddddd",
      backgroundColor: "#f3f4f6", // Light grey for headers
      color: "#1c1c1c", // Dark text for headers
      // fontWeight: "bold",
      fontSize: "14px",
    },
    tableCell: {
      padding: "8px",
      borderBottom: "1px solid #dddddd",
      textAlign: "center",
      fontSize: "14px",
    },
    evenRow: {
      backgroundColor: "#f9f9f9",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "6px",
      marginTop: "10px",
    },
    paginationButton: {
      padding: "5px 8px",
      backgroundColor: "#0033cc",
      border: "none",
      color: "white",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "background-color 0.3s ease",
    },
    paginationButtonHover: {
      backgroundColor: "#002699",
    },
    paginationButtonDisabled: {
      backgroundColor: "#aaa",
      cursor: "not-allowed",
    },
    paginationText: {
      fontSize: "14px",
      color: "#333333",
    },
  };

  return (
    <div 
      // style={styles.leaderboardContainer}
      style={{
        padding: '20px',
        textAlign: 'center',
        // width: deviceType==="phone" ? '100%' : '65%',
      }}
    >
      {loading && <Loading />}
      {success && (
        <>
          <table style={styles.leaderboardTable}>
            <thead>
              <tr>
                <th style={styles.tableHeaderCell}>Rank</th>
                <th style={styles.tableHeaderCell}>Player</th>
                <th style={styles.tableHeaderCell}>Predicted</th>
                {deviceType!="phone" && <th style={styles.tableHeaderCell}>Exact</th>}
                {deviceType!="phone" && <th style={styles.tableHeaderCell}>Result</th>}
                {deviceType!="phone" && <th style={styles.tableHeaderCell}>Close</th>}
                <th style={styles.tableHeaderCell}>Pts</th>
              </tr>
            </thead>
            <tbody>
              {currentPlayers.map((player, index) => (
                <tr
                  key={index}
                  style={index % 2 === 0 ? styles.evenRow : {}}
                >
                  <td style={styles.tableCell}>{player.rank}</td>
                  <td style={styles.tableCell}>{player.name}</td>
                  <td style={styles.tableCell}>{player.predictions}</td>
                  {deviceType!="phone" && <td style={styles.tableCell}>{player.exact}</td>}
                  {deviceType!="phone" && <td style={styles.tableCell}>{player.result}</td>}
                  {deviceType!="phone" && <td style={styles.tableCell}>{player.close}</td>}
                  <td style={styles.tableCell}>{player.points}</td>
                  {/* {player.points.map((point, i) => (
                    <td key={i} style={styles.tableCell}>{point}</td>
                  ))} */}
                </tr>
              ))}
            </tbody>
          </table>

          {playersData.length > 25 && (
            <div style={styles.pagination}>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              style={{
                ...styles.paginationButton,
                ...(currentPage === 1 ? styles.paginationButtonDisabled : {}),
              }}
            >
              Previous
            </button>
            <span style={styles.paginationText}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                ...styles.paginationButton,
                ...(currentPage === totalPages ? styles.paginationButtonDisabled : {}),
              }}
            >
              Next
            </button>
          </div>
          )}
        </>
      )}
    </div>
  );
};

export default LeaderboardCard;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { tournamentLeagueTable, tournamentTable, tournamentTeamTable } from "../redux/Actions";
// import Loading from "./reusables/Loading";

// var playersData = [];

// const pageSize = 25;

// const LeaderboardCard = ({ tournamentId, team, leagueId }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const dispatch = useDispatch();

//   const leaderboardData = useSelector((state) => state._tournamentTable);
//   const { data, loading, error, success} = leaderboardData;

//   useEffect(() => {
//     if(team) {
//       dispatch(tournamentTeamTable(tournamentId, team));
//     } else if(leagueId) {
//       dispatch(tournamentLeagueTable(tournamentId, leagueId));
//     } else {
//       dispatch(tournamentTable(tournamentId));
//     }
//   }, [dispatch, tournamentId]);

//   useEffect(() => {
//     if(data) {
//       data.map((player) => (
//         playersData.push({
//           rank: player.position,
//           name: player.username,
//           points: [player.correctResult, player.closeResult, player.correctScore, player.totalPoints]
//         })
//       ))
//     }
//   }, [data, playersData]);

//   const totalPages = Math.ceil(playersData.length / pageSize);

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const currentPlayers = playersData.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   return (
//     <div className="leaderboard-container">
//       {loading && <Loading />}
//       {success && (
//         <>
//         <table className="leaderboard-table">
//           {console.log(data)}
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Player</th>
//             <th>Result<br />1pt</th>
//             <th>Close<br />1.5pts</th>
//             <th>Exact<br />3pts</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentPlayers.map((player, index) => (
//             <tr key={index}>
//               <td>{player.rank}</td>
//               <td>{player.name}</td>
//               {player.points.map((point, i) => (
//                 <td key={i}>{point}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//      {/* )} */}
//       <div className="pagination">
//         <button onClick={handlePrevious} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={handleNext} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//       </>
//     )}
//       <style jsx>{`
//         .leaderboard-container {
//           margin: 20px;
//           text-align: center;
//         }

//         .leaderboard-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//         }

//         .leaderboard-table th, .leaderboard-table td {
//           padding: 10px;
//           border: 1px solid #ddd;
//           text-align: center;
//         }

//         .leaderboard-table th {
//           background-color: #f4f4f4;
//           font-weight: bold;
//         }

//         .pagination {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 10px;
//         }

//         button {
//           padding: 5px 10px;
//           background-color: #007bff;
//           border: none;
//           color: white;
//           cursor: pointer;
//           border-radius: 4px;
//         }

//         button:disabled {
//           background-color: #aaa;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LeaderboardCard;