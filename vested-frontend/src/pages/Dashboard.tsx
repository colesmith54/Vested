import React, { useEffect } from "react";
import styles from "../styles/Dashboard.module.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { useGlobalState } from "../GlobalState.tsx";

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
