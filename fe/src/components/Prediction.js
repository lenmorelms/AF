import React, { useEffect, useMemo, useState } from 'react';
import TournamentRounds from './reusables/TournamentRounds';
import PredictionCard from './reusables/PredictionCard';
import { useLocation, useParams } from 'react-router-dom';
import { userData } from './reusables/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { profile, tournamentFixtures } from '../redux/Actions';
import Loading from './reusables/Loading';
import MobilePredictionCard from './reusables/MobilePredictionCard';

const Prediction = ({ deviceType, tournamentId }) => {
  // const [userId, setUserId] = useState(null);
  const { id } = useParams();
  const userId = userData._id;
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const data = state;

  // const profileData = useSelector((state) => state._profile);
  // const { data: userData, loading: userDataLoading, success: userDatasuccess } = profileData;

  const fixturesData = useSelector((state) => state._fixtures);
  const { data: fixtureData, loading, error, success } = fixturesData;

  // useMemo(() => {
  //   dispatch(profile());
  // }, [dispatch]);
  // useEffect(() => { setUserId(userData.user._id) });

  useEffect(() => {
    dispatch(tournamentFixtures(id, userId));
    // alert(data.country)
  }, [dispatch, id, userId]);
  
  return (
    <>
      <TournamentRounds tournamentId={tournamentId} />
      {loading && <Loading />}
      {success && (
        <div className="vh">
        <div style={styles.predictionCard} className="flex-container-wrap">
          {console.log(fixtureData.length)}
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