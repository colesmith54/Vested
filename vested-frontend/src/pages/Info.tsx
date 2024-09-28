// Info.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Alert } from "@mui/material";
import StockGraph from "../components/StockGraph";
import styles from "../styles/Info.module.css";

const Info: React.FC = () => {
  const location = useLocation();
  const row = location.state?.row;

  const navigate = useNavigate();

  if (!row) {
    return (
      <Box p={2}>
        <Alert severity="warning">
          No data found. Please go back and select a valid row.
        </Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <div className={styles.infoContainer}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Typography variant="h4">
          {row.name} ({row.ticker.toUpperCase()})
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = row.stockInfoUrl)}
        >
          Visit Website
        </Button>
      </Box>
      <Typography variant="h6">Environmental: {row.environmental}</Typography>
      <Typography variant="h6">Social: {row.social}</Typography>
      <Typography variant="h6">Governance: {row.governance}</Typography>

      <Box className={styles.graphContainer}>
        <StockGraph ticker={row.ticker} />
      </Box>
    </div>
  );
};

export default Info;
