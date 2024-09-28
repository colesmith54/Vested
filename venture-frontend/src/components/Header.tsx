// src/components/Header.tsx
import React from 'react';
import styles from '../styles/Dashboard.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Dashboard</h1>
      <button>Logout</button>
    </header>
  );
};

export default Header;
