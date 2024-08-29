import React, { useEffect } from 'react';
import TournamentRounds from './reusables/TournamentRounds';
import PredictionCard from './reusables/PredictionCard';
import { useParams } from 'react-router-dom';
import { userData } from './reusables/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { tournamentFixtures } from '../redux/Actions';
import Loading from './reusables/Loading';

const Prediction = () => {
  const { id } = useParams();
  const userId = userData._id;
  const dispatch = useDispatch();
  const fixturesData = useSelector((state) => state._fixtures);
  const { data, loading, error, success } = fixturesData;

  useEffect(() => {
    dispatch(tournamentFixtures(id, userId));
  }, [dispatch, id, userId]);
  
  return (
    <>
      <TournamentRounds />
      {loading && <Loading />}
      {success && (
        <div className="vh">
        <div style={styles.predictionCard} className="flex-container-wrap">
          {console.log(data.length)}
        {data.length === 0 && (
          <div className="center">
            NO FIXTURES AS OF YET...
          </div>
        )}
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

export default Prediction;