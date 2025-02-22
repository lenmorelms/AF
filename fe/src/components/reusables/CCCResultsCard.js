import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { teamImage } from "./Functions";
import Team from "./Team";
import Loading from "./Loading";
import Message from "./Message";
import CustomCircularSlider from "./CustomCircularSlider";
// import Button from "../components/reusables/Button";

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    padding: '20px',
    boxSizing: 'border-box',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #e74c3c',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  modalBody: {
    fontSize: '14px',
    color: '#333',
  },
  modalFooter: {
    textAlign: 'right',
    marginTop: '20px',
  },
  modalCloseButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

const CCCResultsCard = ({
  userId,
  tournamentId,
  fixtureId,
  date,
  time,
  homeTeamId,
  awayTeamId,
  actualHalfTimeHomeScore,
  actualHalfTimeAwayScore,
  actualFullTimeHomeScore,
  actualFullTimeAwayScore,
  actualHomeCornerKicks,
  actualAwayCornerKicks,
  actualHomeBallPosession,
  actualAwayBallPosession,
  actualFirstTeamToScore,
  actualFirstGoalMinutes,
  result,
  playerPredicted,
  playerResult,
}) => {
  // State for input fields
  const [halfTimeHomeScore, setHalfTimeHomeScore] = useState(actualHalfTimeHomeScore);
  const [halfTimeAwayScore, setHalfTimeAwayScore] = useState(actualHalfTimeAwayScore);
  const [fullTimeHomeScore, setFullTimeHomeScore] = useState(actualFullTimeHomeScore);
  const [fullTimeAwayScore, setFullTimeAwayScore] = useState(actualFullTimeAwayScore);
  const [homeCornerKicks, setHomeCornerKicks] = useState(actualHomeCornerKicks);
  const [awayCornerKicks, setAwayCornerKicks] = useState(actualAwayCornerKicks);
  const [homeBallPosession, setHomeBallPosession] = useState(49);
  const [awayBallPosession, setAwayBallPosession] = useState(49);
  const [firstGoalMinutes, setFirstGoalMinutes] = useState(actualFirstGoalMinutes);
  const [firstTeamToScore, setFirstTeamToScore] = useState(actualFirstTeamToScore);



  return (
    <div style={styles.cardContainer}>
        <button type="submit" className="btn btn-login" style={styles.submitButton}
          disabled={true}
        >
          {result ? "Results" : "Match not yet concluded"}
        </button>
      <div style={styles.teamsContainer}>
        <div style={styles.team}>
          <Team
            name={homeTeamId}
            logo={teamImage("zimbabwe", "dynamos")}
            logoWidth="80px"
            logoHeight="80px"
          />
        </div>
        <div style={styles.middleContainer}>
          <div style={styles.dateContainer}>
            <p>{date}</p>
            <p>{time}</p>
          </div>
        </div>
        <div style={styles.team}>
          <Team
            name={awayTeamId}
            logo={teamImage("zimbabwe", "simba-bhora")}
            logoWidth="80px"
            logoHeight="80px"
          />
        </div>
      </div>
      
      <form style={styles.form}>
        {/* Halftime Score */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Halftime Score</label>
          <div style={styles.doubleInput}>
            <input
              type="number"
              min={0}
              max={19}
              value={actualHalfTimeHomeScore}
              disabled
              style={styles.inputNumber}
            />
            <input
              type="number"
              min={0}
              max={19}
              value={actualHalfTimeAwayScore}
              disabled
              style={styles.inputNumber}
            />
          </div>
        </div>

        {/* Fulltime Score */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Fulltime Score</label>
          <div style={styles.doubleInput}>
            <input
              type="number"
              min={0}
              max={19}
              value={actualFullTimeHomeScore}
              disabled
              style={styles.inputNumber}
            />
            <input
              type="number"
              min={0}
              max={19}
              value={actualFullTimeAwayScore}
              disabled
              style={styles.inputNumber}
            />
          </div>
        </div>

        {/* First Team to Score */}
        <div style={styles.inputGroup}>
        <label style={styles.label}>First Team to Score</label>

            <input 
              type="text"
              value={firstTeamToScore}
              disabled
              style={styles.inputText}
            />
        </div>

        {/* First Goal Minutes */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>First Goal Minutes</label>
          <div style={styles.doubleInput}>
          <input
            type="number"
            min={0}
            max={90}
            value={firstGoalMinutes}
            disabled
            style={styles.inputNumber}
          />
          </div>
        </div>

        {/* Total Corner Kicks */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Total Corner Kicks</label>
          <div style={styles.doubleInput}>
            <input
              type="number"
              min={0}
              max={29}
              value={homeCornerKicks}
              disabled
              style={styles.inputNumber}
            />
            <input
              type="number"
              min={0}
              max={29}
              disabled
              value={awayCornerKicks}
              style={styles.inputNumber}
            />
          </div>
        </div>

        {/* Ball Possession */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Ball Possession (%)</label>
          <div style={styles.doubleInput}>  
          <CustomCircularSlider
        label="Dynamos"
        value={result ? actualHomeBallPosession : homeBallPosession}
        size={120}
        strokeWidth={10}
        knobColor="blue"
        progressColorFrom="blue"
        progressColorTo="#1A73E8"
        trackColor="#eeeeee"
        labelColor="#fff"
        fontSize={14}
      />
      <CustomCircularSlider
        label="Simba Bhora"
        value={result ? actualAwayBallPosession : awayBallPosession}
        size={120}
        strokeWidth={10}
        knobColor="red"
        progressColorFrom="red"
        progressColorTo="#e74c3c"
        trackColor="#eeeeee"
        labelColor="#fff"
        fontSize={14}
      />
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  cardContainer: {
    backgroundColor: '#1A73E8',
    borderRadius: '10px',
    padding: '20px',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '20px auto',
  },
  teamsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  team: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '14px',
  },
  middleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    marginBottom: '10px',
    textAlign: 'center',
  },
  form: {
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  doubleInput: {
    // display: 'flex',
    // gap: '10px',

    display: 'flex',
  justifyContent: 'center',  // Centers horizontally
  alignItems: 'center',      // Centers vertically (if needed)
  gap: '10px',              // Adds spacing between inputs
  width: '100%', 
  },
  input: {
    flex: 1,
    padding: '8px',
    width: '100%',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px',
    color: '#fff',
  },
  inputNumber: {
    minWidth: '50px',
    minHeight: '50px',
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px',
    textAlign: 'center',
    color: '#fff',
  },  
  inputText: {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px',
    width: '100%',
    color: '#fff',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    color: 'black',
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#e74c3c',
    color: '#ecf0f1',
    border: 'none',
    padding: '12px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  },
  none: {
    display: 'none',
  },
  msg: {
    textAlign: 'center',
    color: '#880808',
  },
};

export default CCCResultsCard;