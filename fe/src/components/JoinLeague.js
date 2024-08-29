import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { userData } from './reusables/Functions';
import { joinLeague } from '../redux/Actions';
import Loading from './reusables/Loading';

const JoinLeague = ({ onClose, tournamentId }) => {
  const userId = userData._id;
  const dispatch = useDispatch();
  const location = useLocation();
  const [leagueCode, setLeagueCode] = useState("");

  const joinLeagueData = useSelector((state) => state._joinLeague);
  const { loading, data, error, success } = joinLeagueData;
  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.className === 'join-league-overlay') {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);
  useEffect(() => {
    if(success) {
      window.location.reload(true);
    }
  }, [success]);

  const joinLeagueHandler = (e) => {
    e.preventDefault();
    dispatch(joinLeague(leagueCode));
  }

  return (
    <div className="join-league-overlay">
      {loading && <Loading />}
      <div className="join-league-modal">
        <div className="join-league-header">
          <b>Join a league</b>
          <button type="button" className="close-button" onClick={onClose}>X</button>
        </div>
        <form onSubmit={joinLeagueHandler}>
          <input 
            type="text" 
            placeholder="Enter league code" 
            className="join-league-input"
            value={leagueCode}
            onChange={((e) => setLeagueCode(e.target.value))}
          />
          <button type="submit" className="join-league-button">Join league</button>
        </form>
      </div>
    </div>
  );
};

export default JoinLeague;