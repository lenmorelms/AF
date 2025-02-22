import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Image from './Image';
import { tournImage } from './Functions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tournament } from '../../redux/Actions';
import Loading from './Loading';

const TournamentHeader = ({ tournamentId }) => {
  const dispatch = useDispatch();
  const tournamentData = useSelector((state) => state._tournament);
  const {loading, data, success } = tournamentData;

  useEffect(() => {
    dispatch(tournament(tournamentId));
  }, [dispatch, tournamentId]);

    return (
        <div className="header-bar">
            <div className="header-bar__left">
            <Link to="/tournaments" className="header-bar__link">
              <FontAwesomeIcon icon={faArrowLeft} style={styles.arrowIcon} /> Tournaments
            </Link>
            <b className="header-bar__title">{success && data.name}</b>
          </div>
          <div className="header-bar__right">
            {/* <span>Presented by</span> */}
            <img src={tournImage(success && data.name.toLowerCase())} alt="Tournament Logo" style={styles.icon} />
            {/* <Image src={tournImage} width={150} height={150} /> */}
          </div>
        </div>
    );
};

const styles = {
  icon: {
    width: '75px',
    height: '75px',
    borderRadius: '35px',
  },
  arrowIcon: {
    color: '#fff',
  },
};

export default TournamentHeader;
