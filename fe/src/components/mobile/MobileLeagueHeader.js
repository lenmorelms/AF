import React from 'react';

const MobileLeaguesHeader = () => {
  return (
    <div className="mobile-leagues-header">
      <h1 className="mobile-leagues-header__title">Leagues</h1>
      <div className="mobile-leagues-header__buttons">
        <button className="mobile-leagues-header__button mobile-leagues-header__button--join">Join a league</button>
        <button className="mobile-leagues-header__button mobile-leagues-header__button--create">
          <span className="plus-icon">+</span> Create a league
        </button>
      </div>
    </div>
  );
};

export default MobileLeaguesHeader;
