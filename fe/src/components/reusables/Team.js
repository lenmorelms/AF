import React from 'react';

const Team = ({ name, logo, onClick, logoWidth, logoHeight }) => {
    return (
        <div style={styles.teamContainer} onClick={onClick}>
            <img src={logo} alt={name} style={{ width: logoWidth, height: logoHeight, marginBottom: '10px' }} />
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
    // logo: {
    //     // width: '80px',style={styles.logo}
    //     // height: '80px',
    //     width: logoWidth,
    //     height: logoHeight,
    //     marginBottom: '10px',
    // },
    teamName: {
        // fontSize: '16px',
        fontSize: '1rem',
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
};

export default Team;
