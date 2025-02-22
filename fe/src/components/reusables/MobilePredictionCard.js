import React, { useEffect, useState } from "react";
import { teamImage, formatDate, isDateTimeInPast, separateDateTime, convertUTCToLocal, isLocalTimeGreater, convertUTCToLocalMobile } from "./Functions";
import Team from "./Team";
import { useDispatch, useSelector } from "react-redux";
import { playerPredictions, tournament } from "../../redux/Actions";
import Loading from "./Loading";
import Message from "./Message";

const MobilePredictionCard = ({ userId, tournamentId, tournamentCountry, fixtureId, round, date, time, dateTime, homeTeamId, awayTeamId, actualHomeScore, actualAwayScore, playerPredicted, result, playerResult }) => {
    
    const [homeScore, setHomeScore] = useState(actualHomeScore);
    const [awayScore, setAwayScore] = useState(actualAwayScore);
    const [predictError, setPredictError] = useState(null);
    const [predictSuccess, setPredictSuccess] = useState(null);
    const dispatch = useDispatch();

    const predictData = useSelector((state) => state._predict);
    const { loading, data, error, success } = predictData;

    useEffect(() => {
      if(error) {
        setPredictError("Failed to Submit Prediction, Try Again");
        setTimeout(() => { 
          setPredictSuccess(null);
        }, 2500);
      }
      if(success) {
        setPredictSuccess("Uploaded Prediction Successfully");
        setTimeout(() => { 
          setPredictSuccess(null);
        }, 2500);
      }
    }, [error, success])
    const submitPredictionHandler = (e) => {
      e.preventDefault();
      setPredictError(null);
      setPredictSuccess(null);
      if(awayScore > 19 || awayScore < 0 || homeScore > 19 || homeScore < 0 || awayScore === null || awayScore === "" || homeScore === null || homeScore === "" ) {
        setPredictError("Score range should be 0 - 19");
      } else {
        dispatch(playerPredictions(tournamentId, userId, fixtureId, round, homeScore, awayScore ));
      }
      // dispatch(playerPredictions(tournamentId, userId, fixtureId, round, homeScore, awayScore ));
    }
    const onInputChange = () => {
      setPredictError(null);
      setPredictSuccess(null);
    }
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
      <div>
          <div style={styles.dateContainer}> 
              {/* <p>{date ? formatDate(date) : separateDateTime(convertUTCToLocal(dateTime)).date}</p>
              <p>{time ? time : separateDateTime(convertUTCToLocal(dateTime)).time}</p> */}
              <p>{convertUTCToLocalMobile(dateTime)}</p>
              {/* <p>{dateTime}</p> */}
          </div>
      <div style={styles.teamsContainer}>
        <div style={styles.team}>
            <Team name={homeTeamId} logo={teamImage(tournamentCountry, homeTeamId)} logoWidth={`30px`} logoHeight={`30px`} />
        </div>
        <div style={styles.middleContainer}>
          {/* <div style={styles.dateContainer}> 
            <p>{formatDate(date)}</p>
            <p>{time}</p>
          </div> */}
          <div style={styles.scoreContainer}>
          <input 
            type="number"
            min={0}
            max={19}
            value={result ? (homeScore) : (playerPredicted && playerResult) ? playerResult.predictedHomeScore : (homeScore)} 
            onChange={(e) => { 
              setHomeScore(e.target.value);
              onInputChange();
            }}
            // onFocus={() => alert()}
            // onBlur={() => alert()}
            className="form-control"  
            disabled={playerPredicted && true} 
          />
          {/* <Select
            defaultValue={result ? (homeScore) : (playerPredicted && playerResult) ? playerResult.predictedHomeScore : (homeScore)}
            onChange={() => { 
              setHomeScore;
              onInputChange();
            }}
            options={scoreOptions}
          /> */}
          <input 
            type="number"
            min={0}
            max={19}
            value={result ? (awayScore) : (playerPredicted && playerResult) ? playerResult.predictedAwayScore : (awayScore)} 
            onChange={(e) => { 
              setAwayScore(e.target.value);
              onInputChange();
            }}
            className="form-control"  
            disabled={playerPredicted && true} 
          />
          </div>
        </div>
        <div style={styles.team}>
            <Team name={awayTeamId} logo={teamImage(tournamentCountry, awayTeamId)} logoWidth={`30px`} logoHeight={`30px`} />
        </div>
      </div>
      </div>
      {/* {!playerPredicted && ( */}
        <button className="btn btn-login" onClick={submitPredictionHandler} disabled={date ? isDateTimeInPast(date, time) && true || playerPredicted && true : (isLocalTimeGreater(dateTime) && true || playerPredicted && true)}>Predict</button>
      {/* )} */}
      {result && (
        <>
        {playerResult && (
          <div style={styles.popularPredictions}>
          <span style={styles.popularTitle}>
            Your Prediction
          </span>
          <div style={styles.predictions}>
            <span style={styles.prediction}>{playerResult.predictedHomeScore+"-"+playerResult.predictedAwayScore}</span>
          </div>
        </div>
        )}
        </>
      )}
    </div>
    );
};
const styles = {
    cardContainer: {
      width: '100%', // Occupies full width of the container
      maxWidth: '100%', // Set a max-width if you want to limit the card width on large screens
      backgroundColor: '#1A73E8',
      borderRadius: '10px',
      padding: '10px',
      color: 'white',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      margin: '0 auto', // Center the card horizontally
    },
    points: {
      color: '#FFD700',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    teamsContainer: {
      display: 'flex',
    //   justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap', // Prevents stacking
    //   gap: '20px',
      marginBottom: '10px',
    },
    team: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '10px',
      flex: 1, // Ensure that each team occupies equal space
    },
    flag: {
      width: '25px',
      height: '25px',
      marginBottom: '5px',
    },
    middleContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      flex: 1, // Ensure the middle container occupies equal space
    },
    dateContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scoreContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
    },
    scoreBox: {
      backgroundColor: 'white',
      color: '#1A73E8',
      padding: '5px 10px',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    result: {
      backgroundColor: '#34A853',
      borderRadius: '5px',
      padding: '5px 0',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    popularPredictions: {
      fontSize: '12px',
    },
    popularTitle: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '5px',
    },
    predictions: {
      textAlign: 'center',
      justifyContent: 'space-between',
    },
    prediction: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '5px',
      borderRadius: '5px',
    },
};

export default MobilePredictionCard;