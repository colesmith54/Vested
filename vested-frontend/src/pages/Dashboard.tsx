import React, { useEffect } from "react";
import Sidebar from '../components/Sidebar.tsx';
import Header from '../components/Header.tsx';
import styles from '../styles/Dashboard.module.css';
import DashboardCard from '../components/DashboardCard.tsx';
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
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.cardContainer}>
          <DashboardCard title="Total Assets" value="$100,000" />
          <DashboardCard title="Total Investments" value="$50,000" />
          <DashboardCard title="Total Returns" value="$5,000" />
          {/* Optional: You can render csvData here or pass it to a DashboardCard */}
          {/* <pre>{JSON.stringify(state.csvData, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
