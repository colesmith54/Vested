import React, { useEffect } from "react";
import styles from '../styles/Dashboard.module.css';
import Header from '../components/Header';
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
    <div>
      <Header />
    </div>
  );
};

export default Dashboard;
