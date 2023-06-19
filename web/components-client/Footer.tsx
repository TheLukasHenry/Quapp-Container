import React from 'react';
import styles from '@/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <a href="/features">Features</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
        <div className={styles.social}>
          <a href="https://twitter.com/quapp" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com/quapp" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com/quapp" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className={styles.copyRight}>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;

