// src/pages/Dashboard.tsx
import React from 'react';
import Sidebar from '../components/Sidebar.tsx';
import Header from '../components/Header.tsx';
import styles from '../styles/Dashboard.module.css';
import DashboardCard from '../components/DashboardCard.tsx';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.cardContainer}>
          <DashboardCard title="Total Assets" value="$100,000" />
          <DashboardCard title="Total Investments" value="$50,000" />
          <DashboardCard title="Total Returns" value="$5,000" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
