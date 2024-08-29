import React, { useEffect } from 'react';
import TournamentRounds from './reusables/TournamentRounds';
import PredictionCard from './reusables/PredictionCard';
import { useParams } from 'react-router-dom';
import { userData } from './reusables/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { tournamentRoundFixtures } from '../redux/Actions';
import Loading from './reusables/Loading';

const RoundPrediction = () => {
  const { id, round } = useParams();
  const userId = userData._id;
  const dispatch = useDispatch();
  const fixturesData = useSelector((state) => state._fixtures);
  const { data, loading, error, success } = fixturesData;

  useEffect(() => {
    dispatch(tournamentRoundFixtures(id, userId, round));
  }, [dispatch, id, userId, round]);
  
  return (
    <>
      <TournamentRounds />
      {loading && <Loading />}
      {success && (
        <div style={styles.predictionCard} className="flex-container-wrap">
        {data && data.map((d) => (
        <div className="flex-prediction-card" key={d._id}>
          <PredictionCard
            userId={userId}
            tournamentId={id}
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
        </div>
      ))}
      </div>
      )}
    </>
  );
};
const styles = {
  predictionCard: {
    padding: '3rem',
  },
};

export default RoundPrediction;