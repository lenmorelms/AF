import React, { useEffect, useState } from "react";
import { calculatePredictionPoints, convertUTCToLocal, formatDate, isDateTimeInPast, isLocalTimeGreater, separateDateTime, teamImage } from "./Functions";
import Team from "./Team";
import { useDispatch, useSelector } from "react-redux";
import { playerPredictions, tournament } from "../../redux/Actions";
import Loading from "./Loading";
import Message from "./Message";

const PredictionCard = ({ userId, tournamentId, tournamentCountry, fixtureId, round, date, time, dateTime, homeTeamId, awayTeamId, actualHomeScore, actualAwayScore, playerPredicted, result, playerResult }) => {
    
    const [homeScore, setHomeScore] = useState(actualHomeScore);
    const [awayScore, setAwayScore] = useState(actualAwayScore);
    const [predictError, setPredictError] = useState(null);
    const [predictSuccess, setPredictSuccess] = useState(null);
    const dispatch = useDispatch();

    const predictData = useSelector((state) => state._predict);
    const { loading, data, error, success } = predictData;

    // var playerOutcome = "";

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
      <div style={styles.teamsContainer}>
        <div style={styles.team}>
            <Team name={homeTeamId} logo={teamImage( tournamentCountry, homeTeamId)} logoWidth={`80px`} logoHeight={`80px`} />
        </div>
        <div style={styles.middleContainer}>
          <div style={styles.dateContainer}>
            <p>{date ? formatDate(date) : separateDateTime(convertUTCToLocal(dateTime)).date}</p>
            <p>{time ? time : separateDateTime(convertUTCToLocal(dateTime)).time}</p>
          </div>
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
            className="form-control"  
            disabled={playerPredicted && true} 
          />
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
            <Team name={awayTeamId} logo={teamImage(tournamentCountry, awayTeamId)} logoWidth={`80px`} logoHeight={`80px`} />
        </div>
      </div>
      {/* {!playerPredicted && ( */}
        <button className="btn btn-login" onClick={submitPredictionHandler} disabled={date ? (isDateTimeInPast(date, time) && true || playerPredicted && true) : (isLocalTimeGreater(dateTime) && true || playerPredicted && true)}>Submit Prediction</button>
      {/* )} */}
      {result && (
        <>
        {/* {playerOutcome = calculatePredictionPoints(actualHomeScore, actualAwayScore, playerResult.predictedHomeScore, playerResult.predictedAwayScore)} */}
        {playerResult && (
          <div style={styles.popularPredictions}>
          <span style={styles.yourResultTitle}>
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
      // width: '25%',
      backgroundColor: '#1A73E8',
      borderRadius: '10px',
      padding: '10px',
      color: 'white',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    points: {
      color: '#FFD700',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    teamsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    team: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '14px',
    },
    flag: {
      width: '40px',
      height: '25px',
      marginBottom: '5px',
    },
    middleContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
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
      marginTop: '8px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    popularPredictions: {
      fontSize: '12px',
    },
    yourResultTitle: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '5px',
    },
    exactPlayerOutcomeTitle: {
      backgroundColor: '#34A853',
      borderRadius: '5px',
      padding: '5px 0',
      marginTop: '8px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    resultPlayerOutcomeTitle: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '5px',
    },
    closePlayerOutcomeTitle: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '5px',
    },
    noPointsPlayerOutcomeTitle: {
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

export default PredictionCard;