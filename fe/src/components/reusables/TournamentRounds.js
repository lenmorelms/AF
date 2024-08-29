import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tournamentRounds } from '../../redux/Actions';
import { Link, useParams } from 'react-router-dom';
import PlayerPoints from './PlayerPoints';

const TournamentRounds = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const tournamentRoundsData = useSelector((state) => state._tournamentRounds);
    const { data } = tournamentRoundsData;

    useEffect(() => {
        dispatch(tournamentRounds(id));
    }, [dispatch, id]);


    // const totalPoints

    return (
        <div style={styles.container}>
            <div style={styles.rounds}>
                {data.map((round, index) => (
                    <div key={index} style={styles.roundItem}>
                        <Link to={`/${id}/predictions/${round}`} style={styles.roundTitle}>{`Round `+round}</Link>
                        {/* <p style={styles.roundTitle}>{round}</p> */}
                        {/* <p style={styles.roundPoints}>{round.points}</p> */}
                    </div>
                ))}
            </div>
            <div style={styles.total}>
                <p style={styles.totalText}>Total</p>
                <p style={styles.totalPoints}>{PlayerPoints}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#0033cc', // Dark blue background
        borderRadius: '8px',
        color: '#ffffff', // White text
        fontFamily: 'Arial, sans-serif',
    },
    rounds: {
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
        gap: '30px',
    },
    roundItem: {
        // textAlign: 'center',
    },
    roundTitle: {
        fontSize: '14px',
        marginBottom: '5px',
        opacity: 0.7,
        color: '#fff',
        textDecoration: 'none',
    },
    roundPoints: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    total: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        borderLeft: '1px solid #ffffff', // White line separating total
    },
    totalText: {
        fontSize: '14px',
        marginRight: '10px',
        opacity: 0.7,
    },
    totalPoints: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#ffd700', // Gold color for total points
    },
};

export default TournamentRounds;