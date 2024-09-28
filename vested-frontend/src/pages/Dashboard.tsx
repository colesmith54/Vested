// src/pages/Dashboard.tsx
import React from 'react';
import styles from '../styles/Dashboard.module.css';
import DashboardCard from '../components/DashboardCard.tsx';
import StickyHeadTable from '../components/SearchResults.tsx';


const Dashboard: React.FC = () => {
  return (
    <div>
      <StickyHeadTable />
    </div>
  );
};

export default Dashboard;
