import React from 'react';

const LeagueInvite = ({ code, link, onClose }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`${text} copied to clipboard!`);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2>Invite your friends</h2>
          <button style={styles.closeButton} onClick={onClose}>X</button>
        </div>
        <div style={styles.body}>
          <div style={styles.section}>
            <h3 style={styles.label}>League code</h3>
            <p style={styles.text}>Your friends can join your league by using this code</p>
            <div style={styles.copySection}>
              <p style={styles.code}>{code}</p>
              <button style={styles.copyButton} onClick={() => handleCopy(code)}>Copy code</button>
            </div>
          </div>
          <div style={styles.section}>
            <h3 style={styles.label}>League link</h3>
            <p style={styles.text}>They can also join your league by using this link:</p>
            <div style={styles.copySection}>
              <p style={styles.link}>{link}</p>
              <button style={styles.copyButton} onClick={() => handleCopy(link)}>Copy link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '500px',
    width: '100%',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bolde',
  },
  text: {
    margin: '10px',
    fontWeight: 'light',
    color: 'grey',
  },
  copySection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
  },
  code: {
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  link: {
    fontSize: '14px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: '200px',
  },
  copyButton: {
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default LeagueInvite;
