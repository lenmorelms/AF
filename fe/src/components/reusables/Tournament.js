import React, { useState } from 'react';
import Image from './Image';
import { Link, useNavigate } from 'react-router-dom';
// import { selectedTournamentDat } from './Functions';

const Tournament = ({ data, Id, logoUrl, flagUrl, title, description, buttonText, isPlayerPartOfTournament, source }) => {
  const navigate = useNavigate();
  // const [tournamentData, setTournamentData] = useState(selectedTournamentDat);
  const chooseTeam = () => {
    if(source === "join") {
      navigate(`/tournaments`)
    }
    else if(isPlayerPartOfTournament) {
      // setTournamentData(data);
      localStorage.setItem('tournamentData', JSON.stringify(data));
      // localStorage.setItem('tournamentData', JSON.stringify(data)).then(() => navigate(`/${Id}/predictions`, { state: data}));
      navigate(`/${Id}/predictions`, { state: data});
    } else {
      localStorage.setItem('tournamentData', JSON.stringify(data));
      navigate(`/${Id}/teams`, { state: data })
      // localStorage.setItem('tournamentData', JSON.stringify(data)).then(() => navigate(`/${Id}/teams`, { state: data }));
    }
  }
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <img
          src={flagUrl}
          alt="Country Flag"
          style={styles.flag}
        />
        <div>
          <h3 style={styles.title}>{title}</h3>
          {/* <p style={styles.subtitle}>Predictor</p> */}
        </div>
        <img
          src={logoUrl}
          alt="Soccer Ball"
          style={styles.icon}
        />
      </div>
      <p style={styles.description}>
        {description}
      </p>
      {/* {source === "join" && <button style={styles.playButton} onClick={chooseTeam}>{buttonText}</button>} */}
      {source==="play" && <button style={styles.playButton} onClick={chooseTeam}>{buttonText}</button>}
    </div>
  );
};

const styles = {
  card: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5%',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  flag: {
    width: '70px',
    height: '50px',
    borderRadius: '3px',
  },
  title: {
    fontSize: '20px',
    color: '#888',
    margin: '0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    margin: '0',
  },
  icon: {
    width: '80px',
    height: '80px',
    borderRadius: '35px',
  },
  description: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px',
  },
  playersCount: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  playButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Tournament;