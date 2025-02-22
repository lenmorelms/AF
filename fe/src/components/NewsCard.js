import React from 'react';

const NewsCard = ({ title, description, imageUrl, sourceLogos, onClick }) => {
  return (
    <div style={styles.card} onClick={onClick}>
      <img src={imageUrl} alt="news-thumbnail" style={styles.image} />
      <div>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{description}</p>
        <div style={styles.footer}>
          <div style={styles.logos}>
            {sourceLogos.map((logo, index) => (
              <img key={index} src={logo} alt={`source-${index}`} style={styles.logo} />
            ))}
          </div>
          <span style={styles.sourcesCount}>{sourceLogos.length} sources</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
    card: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'navy',
      borderRadius: '12px',
      padding: '16px',
      cursor: 'pointer',
      transition: 'transform 0.3s',
      maxWidth: '300px',
      margin: '0 auto',
      color: 'white',
    },
    image: {
      width: '100%',
      borderRadius: '8px',
      marginBottom: '12px',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    description: {
      fontSize: '16px',
      marginBottom: '12px',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logos: {
      display: 'flex',
    },
    logo: {
      width: '24px',
      height: '24px',
      marginRight: '4px',
    },
    sourcesCount: {
      fontSize: '14px',
    }
  };
  
export default NewsCard;
