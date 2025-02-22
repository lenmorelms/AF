import React, { useEffect, useMemo, useState } from 'react';
import TournamentRounds from './reusables/TournamentRounds';
import PredictionCard from './reusables/PredictionCard';
import { useLocation, useParams } from 'react-router-dom';
import { userData } from './reusables/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { profile, tournamentFixtures } from '../redux/Actions';
import Loading from './reusables/Loading';
import MobilePredictionCard from './reusables/MobilePredictionCard';
import { useAuth, useUser } from "@clerk/clerk-react";

const Prediction = ({ deviceType, tournamentId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userId, getToken } = useAuth();
  const { user } = useUser();
  
  const fixturesData = useSelector((state) => state._fixtures);
  const { data: fixtureData, loading, error, success } = fixturesData;

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      dispatch(tournamentFixtures(id, userId, token));
    };
  
    fetchData();
  }, [dispatch, id, userId, getToken]);  
  
  return (
    <>
      <TournamentRounds tournamentId={tournamentId} />
      {loading && <Loading />}
      {success && (
        <div className="vh">
        <div style={styles.predictionCard} className="flex-container-wrap">
        {fixtureData.length === 0 && (
          <div className="center">
            NO FIXTURES AS OF YET...
          </div>
        )}
        {fixtureData && fixtureData.map((d) => (
        <div className="flex-prediction-card" key={d._id}>
          {deviceType === "phone" ? 
          <MobilePredictionCard
            userId={userId}
            tournamentId={id}
            tournamentCountry={JSON.parse(localStorage.getItem('tournamentData')).country}
            fixtureId={d._id}
            round={d.round}
            date={d.date}
            time={d.time}
            dateTime={d.dateTime}
            homeTeamId={d.homeTeamId}
            awayTeamId={d.awayTeamId}
            actualHomeScore={d.actualHomeScore}
            actualAwayScore={d.actualAwayScore}
            playerPredicted={d.playerPredicted}
            result={d.result}
            playerResult={d.playerResult || null}
          />
          :
          <PredictionCard
            userId={userId}
            tournamentId={id}
            tournamentCountry={JSON.parse(localStorage.getItem('tournamentData')).country}
            fixtureId={d._id}
            round={d.round}
            date={d.date}
            time={d.time}
            dateTime={d.dateTime}
            homeTeamId={d.homeTeamId}
            awayTeamId={d.awayTeamId}
            actualHomeScore={d.actualHomeScore}
            actualAwayScore={d.actualAwayScore}
            playerPredicted={d.playerPredicted}
            result={d.result}
            playerResult={d.playerResult || null}
          />
          }
        </div>
      ))}
      </div>
      </div>
      )}
    </>
  );
};
const styles = {
  predictionCard: {
    padding: '0.5rem',
  },
};

export default Prediction;