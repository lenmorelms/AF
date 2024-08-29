import React from 'react';

const Team = ({ name, logo, onClick }) => {
    return (
        <div style={styles.teamContainer} onClick={onClick}>
            <img src={logo} alt={name} style={styles.logo} />
            <p style={styles.teamName}>{name}</p>
        </div>
    );
};

const styles = {
    teamContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '25px',
    },
    logo: {
        width: '80px',
        height: '80px',
        marginBottom: '10px',
    },
    teamName: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
};

export default Team;
