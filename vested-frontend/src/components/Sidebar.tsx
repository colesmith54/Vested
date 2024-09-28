// src/components/Sidebar.tsx

import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "../styles/Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";

interface SubScoreItem {
  category: string;
  score: number;
}

const subScores: SubScoreItem[] = [
  { category: "Economic", score: 72 },
  { category: "Social", score: 68 },
  { category: "Environmental", score: 75 },
];

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

const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`; // Convert to millions and add 'M'
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(1)}K`; // Convert to thousands and add 'K'
  } else {
    return `$${price}`; // Display as is if below 1000
  }
};

const Sidebar: React.FC = () => {
  const { state, removeStock } = useGlobalState();
  const { portfolioItems } = state;
  const navigate = useNavigate();

  console.log(portfolioItems);

  return (
    <Box className={styles.sidebar} onClick={() => navigate("/portfolio")}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" className={styles.title}>
          My Portfolio
        </Typography>
      </Box>
      <Box className={styles.portfolioList}>
        {portfolioItems.map((item, index) => (
          <Card
            key={index}
            className={styles.card}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/info/${item.ticker}`, { state: { row: item } }); // NOTE: Need to do this!!
            }}
          >
            <CardContent className={styles.cardContent}>
              <Box className={styles.cardLine}>
                <Typography variant="body1" className={styles.ticker}>
                  {item.ticker.toUpperCase()}
                </Typography>
                <Typography variant="body2" className={styles.price}>
                  {formatPrice(item.price)} {/* Use the formatted price */}
                </Typography>
                <Box className={styles.options}>
                  {item.options.map(
                    (
                      option: string,
                      optionIndex: React.Key | null | undefined
                    ) => {
                      // Extract the number from the option string
                      const extractedValue = parseInt(option.split("/")[0], 10);

                      // Check if the extracted value is a valid number and within the color mapping range
                      const color = colorMapping[extractedValue] || "#cccccc"; // Default to grey if value is out of range or invalid
                      return (
                        <Box
                          key={optionIndex}
                          className={styles.optionBox}
                          style={{
                            backgroundColor: color,
                            color: "#000",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            display: "inline-block",
                          }}
                        >
                          {option.split("/")[0]}
                        </Box>
                      );
                    }
                  )}
                </Box>

                <IconButton
                  aria-controls={`menu-${item.ticker}`}
                  aria-haspopup="true"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the event from propagating to the parent Box
                    removeStock(item.ticker);
                  }}
                >
                  <RemoveIcon sx={{ color: "#ff6b6b" }} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Footer Section */}
      <Divider className={styles.divider} />

      <Box className={styles.footer}>
        <Grid container spacing={2}>
          {/* Left Half: SubScores */}
          <Grid item xs={6}>
            <Box className={styles.subScores}>
              {subScores.map((subScore, index) => (
                <Box key={index} className={styles.subScoreItem}>
                  <Typography variant="body2">{subScore.category}</Typography>
                  <Typography variant="body2">{subScore.score}/100</Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right Half: Total Score */}
          <Grid item xs={6}>
            <Box className={styles.totalScore}>
              <Typography variant="h3" className={styles.footerNumber}>
                72
              </Typography>
              <Typography variant="h6" className={styles.footerFraction}>
                / 100
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Sidebar;
