import React, { useEffect, useState } from 'react';
import './FixtureCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFixtureResults } from '../redux/Actions';
import LoaderSpinner from './reusables/LoaderSpinner';

const FixtureCard = ({ tournamentId, fixtureId, date, time, homeTeamId, awayTeamId, actualHomeScore, actualAwayScore, result }) => {
    const [homeScore, setHomeScore] = useState(actualHomeScore);
    const [awayScore, setAwayScore] = useState(actualAwayScore);
    const dispatch = useDispatch();

    const resultData = useSelector((state) => state._addFixtureResults);
    const { loading, success, error } = resultData;

    useEffect(() => {
        success && alert("Added Result");
        error && alert("Error");
    }, [success, error]);

    const submitResultHandler = (e) => {
        e.preventDefault();
        dispatch(addFixtureResults(tournamentId, fixtureId, homeScore, awayScore));
    }
    return (
        <div className="fixture-container">
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner">
                        <LoaderSpinner />
                    </div>
                </div>
            )}
            <div className="fixture-row">
                <div className="fixture-column">
                     <b>{homeTeamId}</b>
                </div>
                <div className="fixture-column">
                    <input type="number" name="home-team-score" id="homeTeamScore" value={homeScore} onChange={(e) => setHomeScore(e.target.value)} disabled={result ? true : false} />
                </div>
                <div className="fixture-column">{date}<br />{time}</div>
                <div className="fixture-column">
                    <input type="number" name="away-team-score" id="awayTeamScore" value={awayScore} onChange={(e) => setAwayScore(e.target.value)} disabled={result ? true : false} />
                </div>
                <div className="fixture-column">
                    <b>{awayTeamId}</b>
                </div>
            </div>
            <div className="button-container">
                <button className="action-button" onClick={submitResultHandler} disabled={result ? true : false}>Submit</button>
            </div>
        </div>
    );
};

export default FixtureCard;