// src/pages/Dashboard.tsx

import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Dashboard.module.css';
import Logo from '../assets/vest.png'; // Ensure the logo image is in src/assets/

const Dashboard: React.FC = () => {
  return (
    <Box className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box className={styles.mainContent}>
        {/* Header Section */}
        <Box className={styles.header}>
          {/* Logo */}
          <Box className={styles.logoContainer}>
            <img src={Logo} alt="Logo" className={styles.logo} />
          </Box>

          {/* Search Bar */}
          <Box className={styles.searchContainer}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              className={styles.searchBar}
            />
          </Box>
        </Box>

        {/* Dashboard Content */}
        <Box className={styles.content}>
          <Typography variant="h4" color="white">
            Welcome to the Dashboard!
          </Typography>
          {/* Add more dashboard content here */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
