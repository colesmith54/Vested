// Sidebar.tsx

import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Container,
} from '@mui/material';
import styles from '../styles/Sidebar.module.css';

interface PortfolioItem {
  ticker: string;
  price: number;
  options: string[];
}

const portfolioItems: PortfolioItem[] = [
  { ticker: 'AAPL', price: 150, options: ['A', 'C', 'B'] },
  { ticker: 'GOOGL', price: 2800, options: ['A', 'D', 'E'] },
  { ticker: 'TSLA', price: 700, options: ['B', 'C', 'D'] },
  { ticker: 'AMZN', price: 3500, options: ['A', 'B', 'E'] },
];

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <Typography variant="h6" className={styles.title}>
        My portfolio
      </Typography>

      <div className={styles.portfolioList}>
        {portfolioItems.map((item, index) => (
          <Card key={index} className={styles.card}>
            <CardContent className={styles.cardContent}>
              <Typography variant="body1" className={styles.ticker}>
                {item.ticker}
              </Typography>
              <Typography variant="body2" className={styles.price}>
                ${item.price}
              </Typography>
              <Grid container spacing={1} className={styles.optionsGrid}>
                {item.options.map((option, optionIndex) => (
                  <Grid item key={optionIndex}>
                    <div className={styles.optionBox}>{option}</div>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>

      <Divider className={styles.divider} />

      <div className={styles.footer}>
        <Typography variant="body2" className={styles.footerText}>
          E: 721/1000
        </Typography>
        <Typography variant="body2" className={styles.footerText}>
          E: 721/1000
        </Typography>
        <Typography variant="body2" className={styles.footerText}>
          E: 721/1000
        </Typography>

        <Container className={styles.footerContainer}>
          <Typography variant="h3" component="div" className={styles.footerNumber}>
            72
          </Typography>
          <Typography variant="h6" component="div" className={styles.footerFraction}>
            / 100
          </Typography>
        </Container>
      </div>
    </div>
  );
};

export default Sidebar;
