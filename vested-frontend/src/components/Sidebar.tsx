// src/components/Sidebar.tsx
import React from 'react';
import styles from '../styles/Dashboard.module.css';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Dashboard</h2>
      <ul>
        <li>Home</li>
        <li>Portfolio</li>
        <li>Stocks</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
