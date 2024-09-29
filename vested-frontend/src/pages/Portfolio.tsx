import Header from "../components/Header";
import React from "react";
import styles from "../styles/Portfolio.module.css";
import PortfolioTable from "../components/PortfolioTable";
import { PieChart } from "@mui/x-charts";
import { useGlobalState } from "../GlobalState";

const Portfolio: React.FC = () => {
  const { state } = useGlobalState();

  console.log("Port items: ", state.portfolioItems);
  const chartData = state.portfolioItems.map((item, index) => ({
    id: index,
    value: item.price,
    label: item.name + " ($)",
  }));

  console.log("chart data: ", chartData);

  return (
    <div>
      <Header />
      <div className={styles.infoContainer}>
        <h1 style={{ color: "black", alignSelf: "center" }}>My Portfolio</h1>

        <PieChart
          series={[
            {
              data: chartData,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          // width={400}
          height={200}
        />

        <PortfolioTable />
      </div>
    </div>
  );
};

export default Portfolio;
