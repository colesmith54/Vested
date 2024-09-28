// src/pages/Dashboard.tsx

import React, { useEffect } from 'react';
import styles from '../styles/Dashboard.module.css';
import Table from '../components/Table';
import { useGlobalState } from '../GlobalState';

const Dashboard: React.FC = () => {
  const { updateState } = useGlobalState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://vested-backend.vercel.app/api/csv"
        );
        const result = await response.json();
        console.log(result);
        updateState({ csvData: result });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [updateState]); // Added dependency

  return (
    <div className={styles.dashboardContainer}>
      <Table />
    </div>
  );
};

export default Dashboard;
