// src/components/Portfolio.tsx

import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import styles from "../styles/Portfolio.module.css";
import PortfolioTable from "../components/PortfolioTable";
import { PieChart } from "@mui/x-charts";
import { useGlobalState } from "../GlobalState";
import GaugeComponent from "../components/GaugeComponent";

const Portfolio: React.FC = () => {
  const { state } = useGlobalState();
  const { portfolioItems } = state;

  // Prepare chart data based on portfolio items
  const chartData = portfolioItems.map((item, index) => ({
    id: index,
    value: item.price,
    label: `${item.name}`,
    tooltip: `${item.name}: ${item.price} USD`, // Custom tooltip value to be shown on hover
  }));

  // console.log("state", state);

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (portfolioItems.length > 0) {
      // Initialize total weighted scores and total amount invested
      const totalCategoryWeightedScores: { [key: string]: number } = {
        Environmental: 0,
        Social: 0,
        Governance: 0,
      };
      let totalAmountInvested = 0;

      const categories = ["Environmental", "Social", "Governance"];
      portfolioItems.forEach((item) => {
        const amountInvested = item.amountInvested
          ? item.amountInvested
          : item.price;
        totalAmountInvested += amountInvested;
        item.options.forEach((option: string, index: number) => {
          const extractedValue = parseFloat(option.split("/")[0]);
          if (!isNaN(extractedValue) && categories[index]) {
            totalCategoryWeightedScores[categories[index]] +=
              extractedValue * amountInvested;
          }
        });
      });
      const averageSubScores = categories.map((category) => ({
        category,
        score: totalAmountInvested
          ? parseFloat(
              (
                totalCategoryWeightedScores[category] / totalAmountInvested
              ).toFixed(1)
            )
          : 0,
      }));
      const overallScore = totalAmountInvested
        ? parseFloat(
            (
              categories.reduce(
                (acc, category) => acc + totalCategoryWeightedScores[category],
                0
              ) /
              (totalAmountInvested * categories.length)
            ).toFixed(1)
          )
        : 0;

      console.log("Average SubScores:", averageSubScores);
      console.log("Overall ESG Score:", overallScore);

      // Set the calculated overall ESG score
      setValue(overallScore);
    }
  }, [portfolioItems]);

  const valueFormatter = (item: { value: number }): string => {
    return `$${item.value}`;
  };
  

  return (
    <div>
      <Header />
      <div className={styles.infoContainer}>
        <h1 style={{ color: "black", alignSelf: "center" }}>My Portfolio</h1>

        <Box className={styles.chartGaugeContainer}>
          <Box className={styles.leftContent}>
            <PieChart
              series={[
                {
                  data: chartData,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  valueFormatter
                },
              ]}
              width={600}
              height={200}
            />
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* GaugeComponent */}
          <Box className={styles.rightContent}>
            <Typography variant="h5" gutterBottom style={{ color: "#4caf50" }}>
              Your ESG Score
            </Typography>
            <GaugeComponent value={value} />
            <Typography
              variant="h6"
              style={{ marginTop: "8px", color: "#4caf50" }}
            >
              {value === 0 ? "-" : value} / 10
            </Typography>
          </Box>
        </Box>
        {/* Portfolio Table */}
        <PortfolioTable />
      </div>
    </div>
  );
};

export default Portfolio;