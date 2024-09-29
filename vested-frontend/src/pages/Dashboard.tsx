import React from "react";
import styles from "../styles/Dashboard.module.css";
import Table from "../components/Table";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Table />
    </div>
  );
};

export default Dashboard;
