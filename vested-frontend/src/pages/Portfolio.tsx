import Header from "../components/Header";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Alert } from '@mui/material';
import StockGraph from '../components/StockGraph';
import styles from '../styles/Portfolio.module.css';
import PortfolioTable from "../components/PortfolioTable";


const Portfolio: React.FC = () => {
  return (
    <div>
      <Header />
      <div className={styles.infoContainer}>

      <h1>Portfolio</h1>
      <PortfolioTable />
    </div>
    </div>
  );
};

export default Portfolio;
