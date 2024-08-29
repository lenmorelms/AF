import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLeague } from '../redux/Actions';
import { userData } from './reusables/Functions';
import { useLocation } from 'react-router-dom';
import Loading from './reusables/Loading';

const CreateLeague = ({ onClose, tournamentId }) => {
  const userId = userData._id;
  const dispatch = useDispatch();
  const location = useLocation();
  const [leagueName, setLeagueName] = useState("");
  const createLeagueData = useSelector((state) => state._createLeague)
  const { loading, data, error, success } = createLeagueData;

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
  }, [success])
  const createLeagueHandler = (e) => {
    e.preventDefault();
    dispatch(createLeague(tournamentId, userId, leagueName.toUpperCase()));
    // alert(leagueName+"-"+tournamentId+"-"+userId);
  }

  return (
    <div className="join-league-overlay">
      {loading && <Loading />}
      <div className="join-league-modal">
        <div className="join-league-header">
          <b>Create a league</b>
          <button type="button" className="close-button" onClick={onClose}>X</button>
        </div>
        <form onSubmit={createLeagueHandler}>
          <input 
            type="text" 
            placeholder="Enter league Name" 
            className="join-league-input"
            value={leagueName}
            onChange={((e) => setLeagueName(e.target.value))}
          />
          <button type="submit" className="join-league-button">Create league</button>
        </form>
      </div>
    </div>
  );
};

export default CreateLeague;