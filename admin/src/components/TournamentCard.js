import React from 'react';
import './TournamentCard.css';

const TournamentCard = ({ imageUrl, title, onFixtures, onDelete, onClick }) => {
  return (
    // <div className="tournament-card" onClick={onClick}>
    //   <div className="image-container">
    //     <img src={imageUrl} alt={title} className="tournament-image" />
    //   </div>
    //   <div className="card-content">
    //     <div className="card-title">{title}</div>
    //     <div className="card-buttons">
    //       <button className="edit-button" onClick={onEdit}>Edit</button>
    //       <button className="delete-button" onClick={onDelete}>Delete</button>
    //     </div>
    //   </div>
    // </div>
      <div class="card">
        <a href={onClick}>
          <img className="img-tournament" src={imageUrl} alt={title} />
          <h3>{title}</h3>
        </a>
        <div class="flex-container-by2">
          <a href={onFixtures}><button class="flex-item btn-edit">Add Fixtures</button></a>
          <button class="flex-item btn-delete" onClick={onDelete}>Delete</button>
        </div>
      </div>
  );
};

export default TournamentCard;