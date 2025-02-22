import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rounds } from "../../redux/Actions";

const TournamentRoundsNav = ({id}) => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    const fixtureRoundsData = useSelector((state) => state._fetchFixturesRounds);
    const { data: dataRounds, success: successRounds } = fixtureRoundsData;

    useEffect(() => {
        token && dispatch(rounds(id));
    }, [dispatch, token, id]);
    return (
        <div className="rounds-navigation">
            <ul>
                <li><a href="/" className="active">Rounds:</a></li>
                {successRounds && dataRounds.tournamentRounds.map((round) => (
                    <li><a key={round} href={`/${id}/${round}`}>{round}</a></li>
                ))}
            </ul>
        </div>
    );
};

export default TournamentRoundsNav;