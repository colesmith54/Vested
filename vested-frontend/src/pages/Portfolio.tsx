import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
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

const colorMapping: { [key: string]: string } = {
  "0": "#ff6b6b",
  "1": "#ff6b6b",
  "2": "#ff6b6b",
  "3": "#ff8c00",
  "4": "#ff8c00",
  "5": "#ffd700",
  "6": "#ffd700",
  "7": "#a8dd00",
  "8": "#a8dd00",
  "9": "#00AF4D",
  "10": "#00AF4D",
  "-": "#cccccc",
};

const getColor = (value: string): string => {
  const floor = Math.floor(parseInt(value));
  return colorMapping[floor] || "#cccccc";
};

const renderScore = (score: string, big: boolean) => {
  const color = getColor(score);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography
        variant="h5"
        component="span"
        style={{
          fontSize: big ? "2.8rem" : "1.4rem",
          fontWeight: "bold",
          color: color,
        }}
      >
        {score}
      </Typography>
      <Typography
        variant="h6"
        component="span"
        style={{
          fontSize: big ? "2.0rem" : "1rem",
          fontWeight: "bold",
          marginTop: big ? "0.5rem" : "0.3rem",
          marginLeft: "4px",
          color: "#555",
        }}
      >
        /10
      </Typography>
    </Box>
  );
};

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
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // or 'gpt-4'
          messages: [
            {
              role: "user",
              content: `${namesString}  \n please provide an array of JSONs of size 3, each with 'nonprofitOrganizationName', 'description', and 'link' fields that relate to the provided companies and their missions.
            Be relatively brief, and do not include anything else in your request. Maximum of 350 characters per description.`,
            },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
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
    label: `${item.ticker.toUpperCase()}`,
    tooltip: `${item.name}: ${item.price} USD`, // Custom tooltip value to be shown on hover
  }));

  // Calculate ESG Score
  const [esgScore, setEsgScore] = useState(0);

  useEffect(() => {
    console.log("Portfolio Items:", portfolioItems);
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
      setEsgScore(overallScore);
    } else {
      setEsgScore(0);
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
            <Typography variant="h5" gutterBottom style={{ color: "#4caf50" }}>
              Your ESG Score
            </Typography>
            <GaugeComponent value={esgScore} />
            {renderScore(esgScore === 0 ? "-" : esgScore.toString(), true)}
          </Box>
        </Box>

        {/* Portfolio Table */}
        <PortfolioTable />

        {/* Remove the Suggested Nonprofits section from here */}
      </div>

      {/* Suggested Nonprofits Pop-up */}
      {loading && (
        <Box
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "white",
            zIndex: 1000,
            padding: "16px",
            textAlign: "center",
            overflowX: "hidden", // Added to prevent horizontal scroll
            boxSizing: "border-box",
          }}
        >
          <Typography>Loading AI-Suggested Initiatives...</Typography>
        </Box>
      )}
      {!loading &&
        !error &&
        state.gptResponse &&
        Array.isArray(state.gptResponse) && (
          <Box
            className={styles.gptResponseContainer}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              maxHeight: "50vh",
              overflowY: "auto",
              overflowX: "hidden", // Added to prevent horizontal scroll
              backgroundColor: "white",
              zIndex: 1000,
              padding: "16px",
              boxSizing: "border-box", // Ensures padding is included in width
            }}
          >
            {/* Close button */}
            <Box
              onClick={() => updateState({ gptResponse: null })}
              style={{
                position: "absolute",
                top: "6px",
                right: "16px",
                cursor: "pointer",
                fontSize: "32px",
                color: "#999",
              }}
            >
              &times;
            </Box>
            <Typography variant="h6" color="#1290c4" gutterBottom>
              AI-Suggested Initiatives:
            </Typography>
            {/* Wrap Grid in a Box with padding */}
            <Box
              style={{
                padding: "0 16px", // Adjusts for Grid's negative margins
                boxSizing: "border-box",
              }}
            >
              <Grid container spacing={2}>
                {state.gptResponse.map(
                  (nonprofit: Nonprofit, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        variant="outlined"
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          // Removed marginLeft and marginRight
                        }}
                      >
                        <CardContent style={{ paddingBottom: "8px" }}>
                          <Typography variant="h6" style={{ color: "#4caf50" }}>
                            {nonprofit.nonprofitOrganizationName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {nonprofit.description}
                          </Typography>
                        </CardContent>
                        <CardActions
                          style={{
                            justifyContent: "center",
                            paddingTop: "0",
                          }}
                        >
                          <Button
                            size="small"
                            color="primary"
                            href={nonprofit.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )
                )}
              </Grid>
            </Box>
          </Box>
        )}
    </div>
  );
};

export default Portfolio;
