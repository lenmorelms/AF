import React, { useEffect, useMemo, useState } from 'react';
import TournamentRounds from './reusables/TournamentRounds';
import PredictionCard from './reusables/PredictionCard';
import { useLocation, useParams } from 'react-router-dom';
import { userData } from './reusables/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { profile, tournamentRoundFixtures } from '../redux/Actions';
import Loading from './reusables/Loading';
import MobilePredictionCard from './reusables/MobilePredictionCard';
import { useAuth } from '@clerk/clerk-react';

const RoundPrediction = ({ deviceType, tournamentId }) => {
  const { id, round } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const data = state;

  const { userId, getToken } = useAuth();

  const fixturesData = useSelector((state) => state._fixtures);
  const { data: fixtureData, loading, error, success } = fixturesData;

  useEffect(() => {
      dispatch(tournamentRoundFixtures(id, userId, round));
  }, [dispatch, id, userId, round]);
  
  return (
    <>
      <TournamentRounds tournamentId={tournamentId} />
      {loading && <Loading />}
      {success && (
        <div style={styles.predictionCard} className="flex-container-wrap">
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
      )}
    </>
  );
};
const styles = {
  predictionCard: {
    padding: '0.5rem',
  },
};

export default RoundPrediction;