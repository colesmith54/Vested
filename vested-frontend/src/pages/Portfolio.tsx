// src/components/Portfolio.tsx

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";
import styles from "../styles/Portfolio.module.css";
import PortfolioTable from "../components/PortfolioTable";
import { PieChart } from "@mui/x-charts";
import { useGlobalState } from "../GlobalState";
import GaugeComponent from "../components/GaugeComponent";
import axios from "axios";

export interface Nonprofit {
  nonprofitOrganizationName: string;
  description: string;
  link: string;
}

const Portfolio: React.FC = () => {
  const { state, updateState } = useGlobalState();
  const { portfolioItems } = state;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to generate response from OpenAI
  const generateResponse = async () => {
    const namesString = portfolioItems.map((item) => item.name).join("\n");

    const apiKey = import.meta.env.VITE_OPENAI;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // or 'gpt-4'
          messages: [{ role: 'user', content: `${namesString}  \n please provide an array of JSONs of size 3, each with 'nonprofitOrganizationName', 'description', and 'link' fields that relate to the provided companies and their missions.
            Be relatively brief, and do not include anything else in your request. Maximum of 350 characters per description.` }],
          max_tokens: 500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      const data = JSON.parse(response.data.choices[0].message.content);
      console.log("Data", data);
      updateState({ gptResponse: data });
    } catch (err: any) {
      setError("Failed to fetch data from server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to call generateResponse on component mount and when portfolioItems change
  useEffect(() => {
    if (portfolioItems.length > 0) {
      generateResponse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prepare chart data based on portfolio items
  const chartData = portfolioItems.map((item, index) => ({
    id: index,
    value: item.price,
    label: `${item.name}`,
    tooltip: `${item.name}: ${item.price} USD`, // Custom tooltip value to be shown on hover
  }));

  // Calculate ESG Score
  const [esgScore, setEsgScore] = useState(0);

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
              ) / (totalAmountInvested * categories.length)
            ).toFixed(1)
          )
        : 0;

      console.log("Average SubScores:", averageSubScores);
      console.log("Overall ESG Score:", overallScore);

      // Set the calculated overall ESG score
      setEsgScore(overallScore);
    }
  }, [portfolioItems]);

  // Formatter for chart values
  const valueFormatter = (item: { value: number }): string => {
    return `$${item.value}`;
  };

  return (
    <div>
      <Header />
      <div className={styles.infoContainer}>
        <Typography
          variant="h4"
          component="h1"
          style={{ color: "black", textAlign: "center" }}
        >
          My Portfolio
        </Typography>

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
                  valueFormatter,
                },
              ]}
              width={600}
              height={200}
            />
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* GaugeComponent */}
          <Box className={styles.rightContent}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "#4caf50" }}
            >
              Your ESG Score
            </Typography>
            <GaugeComponent value={esgScore} />
            <Typography
              variant="h6"
              style={{ marginTop: "8px", color: "#4caf50" }}
            >
              {esgScore === 0 ? "-" : esgScore} / 10
            </Typography>
          </Box>
        </Box>

        {/* Portfolio Table */}
        <PortfolioTable />

        <Box className={styles.gptResponseContainer} marginBottom={4}>
          {loading && <Typography>Loading Suggested Nonprofits...</Typography>}
          {!loading && !error && state.gptResponse && Array.isArray(state.gptResponse) && (
            <Box className={styles.gptResponseBox} style={{ position: "relative" }}>
              {/* Close button */}
              <Box
                onClick={() => updateState({ gptResponse: null })} // Replace with your close logic
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  cursor: "pointer",
                  fontSize: "32px",
                  color: "#999",
                }}
              >
                &times;
              </Box>
              <Typography variant="h6" color="#1290c4" gutterBottom>
                Suggested Nonprofits:
              </Typography>
              <Grid container spacing={2}>
                {state.gptResponse.map((nonprofit: Nonprofit, index: number) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card variant="outlined" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                      <CardContent style={{ paddingBottom: "8px" }}>
                        <Typography variant="h6" style={{ color: "#4caf50" }}>
                          {nonprofit.nonprofitOrganizationName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {nonprofit.description}
                        </Typography>
                      </CardContent>
                      <CardActions style={{ justifyContent: "center", paddingTop: "0" }}>
                        <Button size="small" color="primary" href={nonprofit.link} target="_blank" rel="noopener noreferrer">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Portfolio;
