import React from 'react';

const TournamentNav = ({tournamentId}) => {
  return (
    <nav className="nav-bar">
      <ul className="nav-bar__list">
        {/* <li className="nav-bar__item nav-bar__item--active"> */}
        <li className="nav-bar__item">
          <a href={`/${tournamentId}/predictions`} className="nav-bar__link">Prediction</a>
        </li>
        {/* <li className="nav-bar__item">
          <a href={`/${tournamentId}/leagues`} className="nav-bar__link">Leagues</a>
        </li> */}
        {/* <li className="nav-bar__item nav-bar__item--active"> */}
        <li className="nav-bar__item">
          <a href={`/${tournamentId}/results`} className="nav-bar__link">Results</a>
        </li>
        <li className="nav-bar__item">
          <a href={`/${tournamentId}/leaderboard`} className="nav-bar__link">Leaderboard</a>
        </li>
      </ul>
    </nav>
  );
};

export default TournamentNav;