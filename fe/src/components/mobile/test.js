import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tournamentLeagueTable, tournamentTable, tournamentTeamTable } from "../redux/Actions";
import Loading from "./reusables/Loading";

var playersData = [];

const pageSize = 25;

const LeaderboardCard = ({ tournamentId, team, leagueId }) => {
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

  useEffect(() => {
    if (data) {
      data.forEach((player) => {
        playersData.push({
          rank: player.position,
          name: player.username,
          points: [player.correctResult, player.closeResult, player.correctScore, player.totalPoints],
        });
      });
    }
  }, [data]);

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

  return (
    <div className="leaderboard-container">
      {loading && <Loading />}
      {success && (
        <>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Result<br />1pt</th>
                <th>Close<br />1.5pts</th>
                <th>Exact<br />3pts</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {currentPlayers.map((player, index) => (
                <tr key={index} className="leaderboard-row">
                  <td>{player.rank}</td>
                  <td>{player.name}</td>
                  {player.points.map((point, i) => (
                    <td key={i}>{point}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
      <style jsx>{`
        .leaderboard-container {
          margin: 20px;
          padding: 20px;
          background-color: #ffffff; // White background for clarity
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
          text-align: center;
        }

        .leaderboard-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .leaderboard-table th, .leaderboard-table td {
          padding: 12px;
          border: 1px solid #dddddd;
          text-align: center;
          font-size: 14px;
        }

        .leaderboard-table th {
          background-color: #0033cc; // Dark blue for headers
          color: #ffffff;
          font-weight: bold;
        }

        .leaderboard-row:nth-child(even) {
          background-color: #f9f9f9; // Light grey for alternating rows
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }

        .pagination button {
          padding: 8px 12px;
          background-color: #0033cc; // Blue buttons
          border: none;
          color: white;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }

        .pagination button:hover:not(:disabled) {
          background-color: #002699; // Darker blue on hover
        }

        .pagination button:disabled {
          background-color: #aaa; // Grey for disabled
          cursor: not-allowed;
        }

        .pagination span {
          font-size: 14px;
          color: #333333;
        }
      `}</style>
    </div>
  );
};

export default LeaderboardCard;