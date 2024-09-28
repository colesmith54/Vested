// src/components/Sidebar.tsx

import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Box,
} from '@mui/material';
import styles from '../styles/Sidebar.module.css';

interface PortfolioItem {
  ticker: string;
  price: number;
  options: string[];
}

// Note that score is always between 0 and 100
interface SubScoreItem {
  category: string;
  score: number;
}

const portfolioItems: PortfolioItem[] = [
  { ticker: 'AAPL', price: 150, options: ['A', 'C', 'B'] },
  { ticker: 'GOOGL', price: 2800, options: ['A', 'D', 'E'] },
  { ticker: 'TSLA', price: 700, options: ['B', 'C', 'D'] },
  { ticker: 'AMZN', price: 3500, options: ['A', 'B', 'E'] },
];

const subScores: SubScoreItem[] = [
  { category: 'Economic', score: 72 },
  { category: 'Social', score: 68 },
  { category: 'Environmental', score: 75 },
];

const Sidebar: React.FC = () => {
  return (
    <Box className={styles.sidebar}>
      <Typography variant="h5" className={styles.title}>
        My Portfolio
      </Typography>

      <Box className={styles.portfolioList}>
        {portfolioItems.map((item, index) => (
          <Card key={index} className={styles.card}>
            <CardContent className={styles.cardContent}>
                <Box className={styles.cardLine}>
                    <Typography variant="body1" className={styles.ticker}>
                    {item.ticker}
                    </Typography>
                    <Typography variant="body2" className={styles.price}>
                    ${item.price}
                    </Typography>
                    <Box className={styles.options}>
                    {item.options.map((option, optionIndex) => (
                        <Box key={optionIndex} className={styles.optionBox}>
                        {option}
                        </Box>
                    ))}
                    </Box>
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