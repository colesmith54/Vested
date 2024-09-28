import React, { useEffect } from "react";
import styles from '../styles/Dashboard.module.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import { useGlobalState } from '../GlobalState.tsx';

const Dashboard: React.FC = () => {
  const { state, updateState } = useGlobalState(); // Get global state and update function

  // Fetch data from the backend using useEffect (runs only once)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://vested-backend.vercel.app/api/csv");
        const result = await response.json();
        updateState({ csvData: result }); // Store csvData in global state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <Sidebar />
      <Table />
    </div>
  );
};

export default Dashboard;
