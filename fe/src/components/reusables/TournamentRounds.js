import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playerPoints, tournamentRounds } from '../../redux/Actions';
import { Link, useParams } from 'react-router-dom';
import { useAuth, useUser } from "@clerk/clerk-react";

const TournamentRounds = ({ tournamentId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { userId, getToken } = useAuth();
    const { user } = useUser();

    const tournamentRoundsData = useSelector((state) => state._tournamentRounds);
    const { data } = tournamentRoundsData;

    const playerPointsData = useSelector((state) => state._playerPoints);
    const { data: pointsData, success: pointsSuccess } = playerPointsData; 

    useEffect(() => {
        dispatch(tournamentRounds(id));
    }, [dispatch, id]);

    useEffect(() => {
        const fetchPlayerPoints = async () => {
          const token = await getToken();
          dispatch(playerPoints(tournamentId, userId, token));
        };
        fetchPlayerPoints();
    }, [dispatch, tournamentId, getToken]); 

    return (
        <div style={styles.container}>
            <div style={styles.rounds}>
                {data.map((round, index) => (
                    <div key={index} style={styles.roundItem}>
                        <Link to={`/${id}/predictions/${round}`} style={styles.roundTitle}>{`Round `+round}</Link>
                    </div>
                ))}
             </div>
            <div style={styles.total}>
                <p style={styles.totalText}>Total Points</p>
                <p style={styles.totalPoints}>{pointsSuccess && pointsData.totalPoints}</p>
            </div>
        </div>

        // <div style={styles.container}>
        //     <div style={styles.rounds}>
        //         {data.map((round, index) => (
        //             <div key={index} style={styles.roundItem}>
        //                 <Link to={`/${id}/predictions/${round}`} style={styles.roundTitle}>{`Round `+round}</Link>
        //             </div>
        //         ))}
        //     </div>
        //     <div style={styles.total}>
        //         <p style={styles.totalText}>Total Points</p><br />
        //         <p style={styles.totalPoints}>{pointsSuccess && pointsData.totalPoints}</p>
        //     </div>
        // </div>
    );
};
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
        backgroundColor: '#0033cc', // Dark blue background
        color: '#ffffff', // White text
        fontFamily: 'Arial, sans-serif',
    },
    rounds: {
        display: 'flex',
        flexDirection: 'row', // Flex direction set to row for horizontal layout
        alignItems: 'center',
        flexGrow: 1,
        gap: '8px',
        overflowX: 'auto', // Enable horizontal scrolling
        whiteSpace: 'nowrap', // Prevent wrapping of items
        paddingBottom: '10px', // Add padding to avoid content touching the bottom
    },
    roundItem: {
        textAlign: 'center',
        border: '1px solid #ffc300',
        borderRadius: '1rem',
        padding: '0.5rem',
        flexShrink: 0, // Prevents items from shrinking
    },
    roundTitle: {
        fontSize: '1rem',
        marginBottom: '5px',
        opacity: 0.7,
        color: '#fff',
        textDecoration: 'none',
    },
    total: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '2px',
        borderLeft: '1px solid #ffffff', // White line separating total
    },
    totalText: {
        fontSize: '1rem',
        marginRight: '10px',
        opacity: 0.7,
    },
    totalPoints: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#ffd700', // Gold color for total points
    },
};

export default TournamentRounds;