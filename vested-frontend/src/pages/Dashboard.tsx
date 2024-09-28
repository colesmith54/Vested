// src/pages/Dashboard.tsx
import React from 'react';
import styles from '../styles/Dashboard.module.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <Sidebar />
      <Table />
    </div>
  );
};

export default Dashboard;
