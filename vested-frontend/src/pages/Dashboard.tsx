// src/pages/Dashboard.tsx
import React from 'react';
import styles from '../styles/Dashboard.module.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <Sidebar />
    </div>
  );
};

export default Dashboard;
