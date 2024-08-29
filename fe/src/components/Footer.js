import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brandSection}>
          <img src="/path-to-your-logo.png" alt="Logo" style={styles.logo} />
          <h2 style={styles.brandName}>Afripredictor</h2>
        </div>
        
        <div style={styles.linksSection}>
          <h3 style={styles.sectionTitle}>Quick Links</h3>
          <ul style={styles.linksList}>
            <li><a href="#about" style={styles.link}>About Us</a></li>
            <li><a href="#contact" style={styles.link}>Contact Us</a></li>
            <li><a href="#privacy" style={styles.link}>Privacy Policy</a></li>
            <li><a href="#terms" style={styles.link}>Terms of Service</a></li>
          </ul>
        </div>
        
        <div style={styles.socialSection}>
          <h3 style={styles.sectionTitle}>Follow Us</h3>
          <div style={styles.socialIcons}>
            <a href="https://www.facebook.com" style={styles.socialLink}><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://www.twitter.com" style={styles.socialLink}><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://www.instagram.com" style={styles.socialLink}><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://www.linkedin.com" style={styles.socialLink}><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>
        
        <div style={styles.contactSection}>
          <h3 style={styles.sectionTitle}>Contact Us</h3>
          <p>Email: info@afripredictor.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div style={styles.legalSection}>
        <p>&copy; 2024 Afripredictor. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#111',
    color: '#fff',
    padding: '40px 0',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  brandSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '80px',
    marginBottom: '10px',
  },
  brandName: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  linksSection: {
    flex: '1',
    marginBottom: '20px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  linksList: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginBottom: '10px',
    display: 'block',
  },
  socialSection: {
    flex: '1',
    marginBottom: '20px',
    textAlign: 'center',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
  },
  socialLink: {
    color: '#fff',
    margin: '0 10px',
    fontSize: '24px',
  },
  contactSection: {
    flex: '1',
    marginBottom: '20px',
    textAlign: 'center',
  },
  legalSection: {
    borderTop: '1px solid #444',
    padding: '20px 0',
    textAlign: 'center',
    fontSize: '14px',
  },
  // Responsive Styles
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    linksSection: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    socialSection: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    contactSection: {
      textAlign: 'center',
      marginBottom: '20px',
    },
  },
};

export default Footer;