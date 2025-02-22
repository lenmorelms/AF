import React, { useEffect } from "react";
import CCCPredictionCard from "./reusables/CCCPredictionCard";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAuth, useUser } from "@clerk/clerk-react";
import { finalsTournamentFixture } from "../redux/Actions";
import Loading from "./reusables/Loading";

const CCCPrediction = ({ deviceType, tournamentId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { userId, getToken } = useAuth();
    const { user } = useUser();

    const finalsFixtureData = useSelector((state) => state._finalsFixture);
    const { data, loading, error, success } = finalsFixtureData;

    useEffect(() => {
        const fetchData = async () => {
          const token = await getToken();
          dispatch(finalsTournamentFixture(id, userId, token));
        };
      
        fetchData();
      }, [dispatch, id, userId, getToken]);
    return (
        <>
        {loading && <Loading />}
        {success && data.length === 0 && (
          <div className="center">
            NO FIXTURES AS OF YET...
          </div>
        )}
        {success && data.map((d) => (
            <div className="flex-prediction-card" key={d._id}>
                <CCCPredictionCard
                    deviceTyp={deviceType}
                    userId={userId}
                    tournamentId={id}
                    fixtureId={d._id}
                    date={d.date}
                    time={d.time}
                    homeTeamId={d.homeTeamId}
                    awayTeamId={d.awayTeamId}
                    actualHalfTimeHomeScore={d.actualHalfTimeHomeScore}
                    actualHalfTimeAwayScore={d.actualHalfTimeAwayScore}
                    actualFullTimeHomeScore={d.actualFullTimeHomeScore}
                    actualFullTimeAwayScore={d.actualFullTimeAwayScore}
                    actualHomeCornerKicks={d.actualHomeCornerKicks}
                    actualAwayCornerKicks={d.actualAwayCornerKicks}
                    actualHomeBallPosession={d.actualHomeBallPosession}
                    actualAwayBallPosession={d.actualAwayBallPosession}
                    actualFirstTeamToScore={d.actualFirstTeamToScore}
                    actualFirstGoalMinutes={d.actualFirstGoalMinutes}
                    result={d.result}
                    playerPredicted={d.playerPredicted}
                    playerResult={d.playerResult || null}
                />
            </div>
        ))}
        </>
    )
}

export default CCCPrediction