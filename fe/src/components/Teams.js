import React, { useEffect, useMemo, useState } from 'react';
import Team from './reusables/Team';
import { teamImage, userData } from './reusables/Functions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { joinTournament, profile, tournament } from '../redux/Actions';
import Loading from './reusables/Loading';
import Message from './reusables/Message';

const Teams = ({ deviceType }) => {
    const [tournError, setTournError] = useState(null);
    // const [userDatails, setUserDatails] = useState(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const data = state;

    // const tournamentData = useSelector((state) => state._tournament);
    // const { loading, data, error, sucesss } = tournamentData;

    const joinTournamentData = useSelector((state) => state._joinTournament);
    const { data: joinData, loading: joinLoading, error: joinError, success } = joinTournamentData;

    // check if player is part of tournament
    // 

    const joinHandler = (team) => {
        // e.preventDefault();
        setTournError(null);
        dispatch(joinTournament(data._id, userData._id, userData.username, data.name, team));
    }
    useEffect(() => {
        if(success===true) {
            navigate(`/${data._id}/predictions`);
        }
    }, [joinData, success, navigate]);

    useEffect(() => {
        if (joinError) {
            setTournError("Already part of the tournament");
        }
    }, [joinError])

    return (
        <div className="vh" style={styles.container}>
        {/* <div style={styles.container}> */}
            {joinLoading && <Loading />}
            {tournError && (
                <Message variant="alert-danger" onClose={() => setTournError(null)}>
                    {tournError}
                </Message>
            )}
            <h2 style={styles.title}>Which team do you support?</h2>
            <div className="flex-container-wrap" style={styles.teamsGrid}>
                {data && data.teams.map((team, index) => (
                    <div className="flex-team">
                    <Team 
                        key={index} 
                        name={team} 
                        logo={teamImage(data.country, team)}
                        onClick={() => joinHandler(team)}
                        logoWidth={deviceType==="phone" ? `50px` : `100px`} 
                        logoHeight={deviceType==="phone" ? `50px` : `100px`} />
                    </div>
                ))}
            </div>
        {/* </div> */}
        </div>
    );
};
// style={styles.teamsGrid}
const styles = {
    container: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        // maxWidth: '900px',
        margin: '0 auto',
    },
    title: {
        color: '#d9534f',
        fontSize: '24px',
        marginBottom: '20px',
    },
    teamsGrid: {
        display: 'flex',
        PointerEvent: 'hand',
        cursor: 'hand',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
};

export default Teams;