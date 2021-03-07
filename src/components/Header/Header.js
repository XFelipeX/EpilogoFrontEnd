import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.nav} container`}>
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
      </nav>
    </header>
  );
};

export default Header;
