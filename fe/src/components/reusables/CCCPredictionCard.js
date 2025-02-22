import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { finalsPlayerPrediction } from "../../redux/Actions";
import { teamImage, replaceSpacesWithHyphens, timeHasReachedOrPassed } from "./Functions";
import Team from "./Team";
import Loading from "./Loading";
import Message from "./Message";
import Select from "react-select"
import CircularSlider from '@fseehawer/react-circular-slider';
import CustomCircularSlider from "./CustomCircularSlider";
import CustomHorizontalSlider from "./CustomHorizontalSlider";
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

const CCCPredictionCard = ({
  deviceType,
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
  const sliderData = Array.from({ length: 99 }, (_, i) => i + 1);
  const [homeBallPosession, setHomeBallPosession] = useState(49);
  const [awayBallPosession, setAwayBallPosession] = useState(49);
  const [firstGoalMinutes, setFirstGoalMinutes] = useState(actualFirstGoalMinutes);
  const [firstTeamToScore, setFirstTeamToScore] = useState(actualFirstTeamToScore);

  const handleHomeChange = (newVal) => {
    // Clamp newVal between 1 and 99
    const home = Math.max(1, Math.min(newVal, 99));
    setHomeBallPosession(home);
    setAwayBallPosession(100 - home);
  };

  const handleAwayChange = (newVal) => {
    const away = Math.max(1, Math.min(newVal, 99));
    setAwayBallPosession(away);
    setHomeBallPosession(100 - away);
  };


  const [predictError, setPredictError] = useState(null);
  const [predictSuccess, setPredictSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [value, setValue] = useState(7);

  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const predictData = useSelector((state) => state._finalsPredict);
  const { loading, data, error, success } = predictData;

  useEffect(() => {
    if (error) {
      setPredictError("Failed to Submit Prediction, Try Again");
      setTimeout(() => {
        setPredictSuccess(null);
      }, 2500);
    }
    if (success) {
      setPredictSuccess("Uploaded Prediction Successfully");
      setTimeout(() => {
        setPredictSuccess(null);
      }, 2500);
    }
  }, [error, success]);

  const handleFirstteamToScore = (team) => {
    setFirstTeamToScore(team.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictError(null);
    setPredictSuccess(null);
    // Validate input fields
    if (
      halfTimeHomeScore > 19 ||
      halfTimeHomeScore < 0 ||
      halfTimeAwayScore > 19 ||
      halfTimeAwayScore < 0 ||
      fullTimeHomeScore > 19 ||
      fullTimeHomeScore < 0 ||
      fullTimeAwayScore > 19 ||
      fullTimeAwayScore < 0 ||
      homeCornerKicks > 29 ||
      homeCornerKicks < 0 ||
      awayCornerKicks > 29 ||
      awayCornerKicks < 0 ||
      homeBallPosession > 99 ||
      homeBallPosession < 1 ||
      awayBallPosession > 99 ||
      awayBallPosession < 1 ||
      firstGoalMinutes > 90 ||
      // firstGoalMinutes < 1 || 
      !firstTeamToScore
    ) {
      setShowModal(true);
      return;
    } else {
      const token = await getToken();
      dispatch(
        finalsPlayerPrediction(
          tournamentId,
          userId,
          fixtureId,
          halfTimeHomeScore,
          halfTimeAwayScore,
          fullTimeHomeScore,
          fullTimeAwayScore,
          homeCornerKicks,
          awayCornerKicks,
          homeBallPosession,
          awayBallPosession,
          firstGoalMinutes,
          firstTeamToScore,
          token
        )
      );
    }
  };

  const onInputChange = () => {
    setPredictError(null);
    setPredictSuccess(null);
  };

  const teamToScore = [
    { value: 'No Goal', label: 'No Goals'},
    { value: 'Dynamos', label: 'Dynamos' },
    { value: 'Simba Bhora', label: 'Simba Bhora' },
  ];

  let halfTimePoints = 0;
  let fullTimePoints = 0;
  let firstTeamPoints = 0;
  let firstGoalPoints = 0;
  let cornerKickPoints = 0;
  let ballPossessionPoints = 0;

  function calculatePlayerPoints() {
    if (result) {
    if (actualHalfTimeHomeScore === playerResult[0].predictedHalfTimeHomeScore && actualHalfTimeAwayScore === playerResult[0].predictedHalfTimeAwayScore) {
      halfTimePoints += 3;
    }

    if (actualFullTimeHomeScore === playerResult[0].predictedFullfTimeHomeScore && actualFullTimeAwayScore === playerResult[0].predictedFullTimeAwayScore) {
      fullTimePoints += 3;
    } else if((actualFullTimeHomeScore+actualFullTimeAwayScore) / (playerResult[0].predictedFullTimeHomeScore+playerResult[0].predictedFullTimeAwayScore) <= 1.5
      || (actualFullTimeHomeScore+actualFullTimeAwayScore) / (playerResult[0].predictedFullTimeHomeScore+playerResult[0].predictedFullTimeAwayScore) >= -1.5) {
        fullTimePoints += 2;
    } else if((actualFullTimeHomeScore > actualFullTimeAwayScore && playerResult[0].predictedFullTimeHomeScore > playerResult[0].predictedFullTimeAwayScore)
      || (actualFullTimeAwayScore > actualFullTimeHomeScore && playerResult[0].predictedFullTimeAwayScore > playerResult[0].predictedFullTimeHomeScore)
      || (actualFullTimeHomeScore === actualFullTimeAwayScore && playerResult[0].predictedFullTimeHomeScore === playerResult[0].predictedFullTimeAwayScore) ) {
        fullTimePoints += 1;
    }

    if(actualFirstTeamToScore === playerResult[0].predictedFirstTeamToScore) {
      firstTeamPoints += 2;
    }

    if (actualFirstGoalMinutes === playerResult[0].predictedFirstGoalMinutes) {
      firstGoalPoints += 5;
    } else if ((actualFirstGoalMinutes - playerResult[0].predictedFirstGoalMinutes) <= 3 || (actualFirstGoalMinutes - playerResult[0].predictedFirstGoalMinutes) >= -3) { 
      firstGoalPoints += 3;
    } else if ((actualFirstGoalMinutes - playerResult[0].predictedFirstGoalMinutes) <= 5 || (actualFirstGoalMinutes - playerResult[0].predictedFirstGoalMinutes) >= -5) {
      firstGoalPoints += 1;
    }

    if (actualHomeCornerKicks === playerResult[0].predictedHomeCornerKicks) {
      cornerKickPoints += 3;
    }
    if (actualAwayCornerKicks === playerResult[0].predictedAwayCornerKicks) {
      cornerKickPoints += 3;
    }
    if ((actualHomeCornerKicks === playerResult[0].predictedHomeCornerKicks) && (actualAwayCornerKicks === playerResult[0].predictedAwayCornerKicks)) {
      cornerKickPoints += 0;
    } else if((actualHomeCornerKicks+actualAwayCornerKicks) / (playerResult[0].predictedHomeCornerKicks+playerResult[0].predictedAwayCornerKicks) <= 1.5
      || (actualHomeCornerKicks+actualAwayCornerKicks) / (playerResult[0].predictedHomeCornerKicks+playerResult[0].predictedAwayCornerKicks) >= -1.5) {
        cornerKickPoints += 2;
  } else if((actualHomeCornerKicks > actualAwayCornerKicks && playerResult[0].predictedHomeCornerKicks > playerResult[0].predictedAwayCornerKicks)
      || (actualAwayCornerKicks > actualHomeCornerKicks && playerResult[0].predictedAwayCornerKicks > playerResult[0].predictedHomeCornerKicks)
      || (actualHomeCornerKicks === actualAwayCornerKicks && playerResult[0].predictedHomeCornerKicks === playerResult[0].predictedAwayCornerKicks) ) {
        cornerKickPoints += 1;        
  }

  // BALL POSSESSION
  if (actualHomeBallPosession === playerResult[0].predictedHomeBallPosession) {
    ballPossessionPoints += 5;
  }
  if (actualAwayBallPosession === playerResult[0].predictedAwayBallPosession) {
    ballPossessionPoints += 5;
  }
  if ((actualHomeBallPosession === playerResult[0].predictedHomeBallPosession) && (actualAwayBallPosession === playerResult[0].predictedAwayBallPosession)) {
    ballPossessionPoints += 0;
  } else if((actualHomeBallPosession+actualAwayBallPosession) / (playerResult[0].predictedHomeBallPosession+playerResult[0].predictedAwayBallPosession) <= 1.5
    || (actualHomeBallPosession+actualAwayBallPosession) / (playerResult[0].predictedHomeBallPosession+playerResult[0].predictedAwayBallPosession) >= -1.5) {
      ballPossessionPoints += 3;
  } else if((actualHomeBallPosession > actualAwayBallPosession && playerResult[0].predictedHomeBallPosession > playerResult[0].predictedAwayBallPosession)
    || (actualAwayBallPosession > actualHomeBallPosession && playerResult[0].predictedAwayBallPosession > playerResult[0].predictedHomeBallPosession)
    || (actualHomeBallPosession === actualAwayBallPosession && playerResult[0].predictedHomeBallPosession === playerResult[0].predictedAwayBallPosession) ) {
      ballPossessionPoints += 2;
  }
 }
  }
  calculatePlayerPoints();

  return (
    <div style={styles.cardContainer}>
      {loading && <Loading />}
      {(error && predictError) && (
        <Message variant="alert-danger" onClose={() => setPredictError(null)}>
          {predictError}
        </Message>
      )}
      {(success && predictSuccess) && (
        <Message variant="alert-success" onClose={() => setPredictSuccess(null)}>
          {predictSuccess}
        </Message>
      )}
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
            <p>SAT, 22 FEB 2025</p>
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
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Halftime Score */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Halftime Score</label>
          <div style={styles.doubleInput}>
            <input
              type="number"
              min={0}
              max={19}
              value={(playerPredicted && playerResult) ? playerResult[0].predictedHalfTimeHomeScore : (halfTimeHomeScore)}
              onChange={(e) => {
                setHalfTimeHomeScore(e.target.value);
                onInputChange();
              }}
              style={styles.inputNumber}
            />
            {result ? 
              <div style={styles.points}>
                <b>You Earned</b>
                <p>{halfTimePoints} Points</p>
              </div>
              : "" }
            <input
              type="number"
              min={0}
              max={19}
              value={(playerPredicted && playerResult) ? playerResult[0].predictedHalfTimeAwayScore : (halfTimeAwayScore)}
              onChange={(e) => { 
                setHalfTimeAwayScore(e.target.value);
                onInputChange();
              }}
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
              value={(playerPredicted && playerResult) ? playerResult[0].predictedFullTimeHomeScore : (fullTimeHomeScore)}
              onChange={(e) => { 
                setFullTimeHomeScore(e.target.value);
                onInputChange();
              }}
              style={styles.inputNumber}
            />
            {result ? 
              <div style={styles.points}>
                <b>You Earned</b>
                <p>{fullTimePoints} Points</p>
              </div>
              : "" }
              {/* {!result && <div style={styles.msg}><b>*full time is 90 mins + added time*</b></div>} */}
            <input
              type="number"
              min={0}
              max={19}
              value={(playerPredicted && playerResult) ? playerResult[0].predictedFullTimeAwayScore : (fullTimeAwayScore)}
              onChange={(e) => { 
                setFullTimeAwayScore(e.target.value);
                onInputChange();
              }}
              style={styles.inputNumber}
            />
            {!result && <div style={styles.msg}><b>*full time is 90 mins + added time*</b></div>}
          </div>
        </div>

        {/* First Team to Score */}
        <div style={styles.inputGroup}>
        <label style={styles.label}>First Team to Score</label>
          {(playerPredicted && playerResult) ? (
            <input 
              type="text"
              value={playerResult[0].predictedFirstTeamToScore}
              // disabled
              style={styles.inputText}
            />
          ) : (
            <>
            {/* <label style={styles.label}>First Team to Score</label> */}
          {/* <select
            value={firstTeamToScore}
            onChange={(e) => { 
              setFirstTeamToScore(e.target.value);
              onInputChange();
            }}
            style={styles.select}
          >
            <option value="">Select Team</option>
            <option value="Dynamos">Dynamos</option>
            <option value="Simba Bhora">Simba Bhora</option>
          </select> */}
          <div style={styles.select}>
            <Select
              // value={firstTeamToScore}
              options={teamToScore}
              onChange={(selectedOption) => {
                handleFirstteamToScore(selectedOption);
                onInputChange();
              }}
            />
            </div>
          </>
          )}
          {result ? 
              <div style={styles.points}>
                <b>You Earned</b>
                <p>{firstTeamPoints} Points</p>
              </div>
              : "" }
        </div>

        {/* First Goal Minutes */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>First Goal Minutes</label>
          <div style={styles.doubleInput}>
          <input
            type="number"
            min={0}
            max={90}
            value={(playerPredicted && playerResult) ? playerResult[0].predictedFirstGoalMinutes : (firstGoalMinutes)}
            onChange={(e) => { 
              setFirstGoalMinutes(e.target.value);
              onInputChange();
            }}
            style={styles.inputNumber}
          />
          </div>
          {result ? 
              <div style={styles.points}>
                <b>You Earned</b>
                <p>{firstGoalPoints} Points</p>
              </div>
              : "" }
          {!result && <div style={styles.msg}><b>*select zero for no goal*</b></div>}
        </div>

        {/* Total Corner Kicks */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Total Corner Kicks</label>
          <div style={styles.doubleInput}>
            <input
              type="number"
              min={0}
              max={29}
              value={(playerPredicted && playerResult) ? playerResult[0].predictedHomeCornerKicks : (homeCornerKicks)}
              onChange={(e) => { 
                setHomeCornerKicks(e.target.value);
                onInputChange();
              }}
              style={styles.inputNumber}
            />
            {result ? 
              <div style={styles.points}>
                <b>You Earned</b>
                <p>{cornerKickPoints} Points</p>
              </div>
              : "" }
            <input
              type="number"
              min={0}
              max={29}
              value={(playerPredicted && playerResult) ? playerResult[0].predictedAwayCornerKicks : (awayCornerKicks)}
              onChange={(e) => { 
                setAwayCornerKicks(e.target.value);
                onInputChange();
              }}
              style={styles.inputNumber}
            />
          </div>
        </div>

        {/* Ball Possession */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Ball Possession (%)</label>
          <div style={styles.doubleInput}>
              <CustomHorizontalSlider
                  label="Dynamos"
                  value={(playerPredicted && playerResult) ? playerResult[0].predictedHomeBallPosession : homeBallPosession}
                  onChange={handleHomeChange}
                  size={80}
                  strokeWidth={10}
                  knobColor="blue"
                  progressColorFrom="blue"
                  progressColorTo="#1A73E8"
                  trackColor="#eeeeee"
                  labelColor="#fff"
                  fontSize={14}
              />
              {result ? 
              <div style={styles.points}>
                <b>You Earned</b>
                <p>{ballPossessionPoints} Points</p>
              </div>
              : "" }
              <CustomHorizontalSlider
                  label="Simba Bhora"
                  value={(playerPredicted && playerResult) ? playerResult[0].predictedAwayBallPosession : awayBallPosession}
                  onChange={handleAwayChange}
                  size={80}
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
        <button type="submit" className="btn btn-login" style={styles.submitButton}
          disabled={(timeHasReachedOrPassed(date, time) || playerPredicted) ? true : false}
        >
          Submit Prediction
        </button>
      </form>

      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <div style={modalStyles.modalHeader}>
              <h3>Error in Prediction Input</h3>
              <button style={modalStyles.closeButton} onClick={() => setShowModal(false)}>X</button>
            </div>
            <div style={modalStyles.modalBody}>
              <ul>
                <li>Scores should range from 0 to 19.</li>
                <li>Corner kicks should range from 0 to 29.</li>
                <li>Ball possession should range from 1 to 99.</li>
                <li>First goal minutes should range from 1 to 90.</li>
                <li>First team to score should not be blank.</li>
              </ul>
            </div>
            <div style={modalStyles.modalFooter}>
              <button style={modalStyles.modalCloseButton} onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
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
  },
  inputNumber: {
    minWidth: '50px',
    minHeight: '50px',
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px',
    textAlign: 'center',
  },  
  inputText: {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px',
    width: '100%',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    color: 'black',
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
    color: '#e74c3c',
  },
  points: {
    textAlign: 'center',
    color: '#e74c3c',
  },
};

export default CCCPredictionCard;