// Info.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Alert,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LaunchIcon from "@mui/icons-material/Launch";
import StockGraph from "../components/StockGraph";
import styles from "../styles/Info.module.css";
import ImageWithFallback from "../components/ImageWithFallback";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useGlobalState } from "../GlobalState.tsx";
import News from "../components/News";

const colorMapping: { [key: number]: string } = {
  0: "#ff6b6b",
  1: "#ff6b6b",
  2: "#ff6b6b",
  3: "#ff8c00",
  4: "#ff8c00",
  5: "#ffd700",
  6: "#ffd700",
  7: "#a8dd00",
  8: "#a8dd00",
  9: "#00AF4D",
  10: "#00AF4D",
};

const getColor = (value: number): string => {
  const floor = Math.floor(value);
  return colorMapping[floor] || "#000000";
};

const renderScore = (score: string) => {
  const value = parseFloat(score);
  if (isNaN(value)) {
    return (
      <Typography variant="h6" style={{ color: "red" }}>
        N/A
      </Typography>
    );
  }
  const color = getColor(value);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography
        variant="h5"
        component="span"
        style={{
          fontSize: "2em",
          color: color,
          fontWeight: "bold",
        }}
      >
        {value.toFixed(1)}
      </Typography>
      <Typography
        variant="h6"
        component="span"
        style={{
          marginTop: "1.2rem",
          marginLeft: "4px",
          color: "#555",
        }}
      >
        /10
      </Typography>
    </Box>
  );
};

const Info: React.FC = () => {
  const { state, updateState } = useGlobalState();
  const location = useLocation();
  const row = location.state?.row;

  const { portfolioItems } = state;
  const [openDialog, setOpenDialog] = useState(false);
  const [portfolioAmount, setPortfolioAmount] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const navigate = useNavigate();

  const handleAddToPortfolio = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPortfolioAmount("");
  };

  const handleAddPortfolioSubmit = (edit: boolean = false) => {
    if (!edit) {
      updateState({
        portfolioItems: [
          ...portfolioItems,
          {
            ...row,
            price: parseFloat(portfolioAmount),
            options: [row.environmental, row.social, row.governance],
          },
        ],
      });
    } else {
      updateState({
        portfolioItems: portfolioItems.map((item) =>
          item.ticker === row.ticker
            ? {
                ...item,
                price: parseFloat(portfolioAmount),
                options: [row.environmental, row.social, row.governance],
              }
            : item
        ),
      });
    }
    handleDialogClose();
  };

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
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <div className={styles.infoContainer}>
      {/* Header Section */}
      <Box display="flex" alignItems="center" width="100%">
        <ImageWithFallback
          src={row.logo}
          alt={row.name}
          style={{
            marginRight: "40px",
            width: "80px",
            height: "80px",
            objectFit: "contain",
          }}
        />
        <Typography variant="h4" style={{ color: "#393E41" }}>
          {row.name} ({row.ticker.toUpperCase()})
        </Typography>
      </Box>

      {/* Buttons Section */}
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={2}
        mb={4}
        gap={2}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "#90CA8F" }}
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        {row.stockInfoUrl && (
          <Button
            variant="outlined"
            color="primary"
            sx={{ color: "#90CA8F", borderColor: "#90CA8F" }}
            href={row.website}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<LaunchIcon />}
            onClick={() => window.open(row.stockInfoUrl, "_blank")}
          >
            Visit Website
          </Button>
        )}
        <IconButton
          aria-controls={`menu-${row.ticker}`}
          aria-haspopup="true"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToPortfolio();
          }}
        >
          {state.portfolioItems.find((item) => item.ticker === row.ticker) ? (
            <EditIcon />
          ) : (
            <AddIcon />
          )}
        </IconButton>
      </Box>

      {/* Dialog for Add/Edit Portfolio */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {state.portfolioItems.find((item) => item.ticker === row.ticker)
            ? "Edit Portfolio Item"
            : "Add to Portfolio"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {state.portfolioItems.find((item) => item.ticker === row.ticker)
              ? `Edit the amount in dollars for ${row.name}.`
              : `Enter the amount in dollars for ${row.name}.`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={`portfolio-amount-${row.ticker}`}
            label="Amount ($)"
            fullWidth
            type="number"
            variant="standard"
            value={portfolioAmount}
            onChange={(e) => setPortfolioAmount(e.target.value)}
            inputProps={{ min: "0", step: "0.01" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={() =>
              handleAddPortfolioSubmit(
                !!state.portfolioItems.find(
                  (item) => item.ticker === row.ticker
                )
              )
            }
            disabled={!portfolioAmount || parseFloat(portfolioAmount) <= 0}
          >
            {state.portfolioItems.find((item) => item.ticker === row.ticker)
              ? "Edit"
              : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tabs Section */}
      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        sx={{
          marginBottom: 2,
          "& .MuiTabs-indicator": {
            backgroundColor: "#393E41",
          },
          "& .MuiTab-root": {
            color: "#393E41",
            textTransform: "none",
            "&.Mui-selected": {
              color: "#393E41",
            },
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
          },
        }}
      >
        <Tab label="Stock Info" />
        <Tab label="News" />
      </Tabs>

      {/* Content Based on Selected Tab */}
      {tabIndex === 0 && (
        <div
          style={{ display: "flex", alignItems: "flex-start", width: "100%" }}
        >
          <div style={{ flex: "0 0 70%" }}>
            <Box className={styles.graphContainer}>
              <StockGraph ticker={row.ticker} />
            </Box>
          </div>
          <div
            style={{ flex: "0 0 30%", paddingLeft: "40px", textAlign: "left" }}
          >
            <Typography variant="h5" style={{ color: "#393E41" }}>
              Environmental: {renderScore(row.environmental)}
            </Typography>
            <Typography
              variant="h5"
              style={{ color: "#393E41", marginTop: "24px" }}
            >
              Social: {renderScore(row.social)}
            </Typography>
            <Typography
              variant="h5"
              style={{ color: "#393E41", marginTop: "24px" }}
            >
              Governance: {renderScore(row.governance)}
            </Typography>
          </div>
        </div>
      )}

      {tabIndex === 1 && (
        <Box sx={{ width: "100%" }}>
          <News name={row.name} />
        </Box>
      )}
    </div>
  );
};

export default Info;
