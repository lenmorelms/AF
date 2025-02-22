import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { finalsTable } from "../redux/Actions";
import { useAuth } from "@clerk/clerk-react";

const FinalsLeaderboardCard = ({deviceType, tournamentId}) => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const finalsPoints = useSelector((state) => state._finalsPoints);
  const { data: tableData, loading, error, success } = finalsPoints;

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      dispatch(finalsTable(tournamentId, token));
    };
        
    fetchData();
  }, [dispatch, tournamentId, getToken]);
  // Create some mock data (for example purposes, 30 players)
  // const tableData = [];

  const pageSize = 25;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tableData.length / pageSize);
  const filteredData = tableData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={styles.cardContainer}>
      {success && console.log("<<<<<>>>>"+typeof data)}
      <h2 style={styles.heading}>Leaderboard</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Pos</th>
            <th style={styles.tableHeader}>Username</th>
            <th style={styles.tableHeader}>Team</th>
            <th style={styles.tableHeader}>Points</th>
          </tr>
        </thead>
        <tbody>
          {success && filteredData.map((player, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableCell}>{player.position}</td>
              <td style={styles.tableCell}>{player.username}</td>
              <td style={styles.tableCell}>{player.team}</td>
              <td style={styles.tableCell}>{player.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        <button
          style={styles.paginationButton}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={styles.paginationText}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={styles.paginationButton}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    backgroundColor: "#1A73E8",
    borderRadius: "10px",
    padding: "20px",
    color: "white",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "20px auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#0033cc",
    padding: "10px",
    border: "1px solid #fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    textAlign: "center",
  },
  pagination: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  paginationButton: {
    padding: "8px 16px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  paginationText: {
    fontSize: "14px",
  },
};

export default FinalsLeaderboardCard;
