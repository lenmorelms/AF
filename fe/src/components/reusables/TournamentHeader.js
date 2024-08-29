import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Image from './Image';
import { tournImage } from './Functions';
import { Link } from 'react-router-dom';

const TournamentHeader = ({ tournamentName }) => {
    return (
        <div className="header-bar">
          <div className="header-bar__left">
            <Link to="/tournaments" className="header-bar__link">
              <FontAwesomeIcon icon={faArrowLeft} style={styles.arrowIcon} /> Tournaments
            </Link>
            <b className="header-bar__title">{tournamentName}</b>
          </div>
          <div className="header-bar__right">
            {/* <span>Presented by</span> */}
            <img src={tournImage} alt="Tournament Logo" style={styles.icon} />
            {/* <Image src={tournImage} width={150} height={150} /> */}
          </div>
        </div>
    );
};

const styles = {
  icon: {
    width: '70px',
    height: '70px',
    borderRadius: '35px',
  },
  arrowIcon: {
    color: '#fff',
  },
};

export default TournamentHeader;
