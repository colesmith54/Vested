// src/components/Header.tsx

import React from 'react';
import { Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import Logo from '../assets/vestedLogo.png';

const Header: React.FC = () => {
  return (
    <Box className={styles.headerContainer}>
      {/* Logo on the Left */}
      <Box className={styles.logoContainer}>
        <img src={Logo} alt="Logo" className={styles.logo} />
      </Box>

      {/* Search Bar and Navigation Links on the Right */}
      <Box className={styles.searchContainer}>
        {/* Search Bar */}
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          className={styles.searchBar}
        />

        {/* Navigation Links */}
        <Box className={styles.navLinks}>
          <Link to="/" className={styles.link}>
            Dashboard
          </Link>
          <Link to="/info" className={styles.link}>
            Info
          </Link>
          <Link to="/portfolio" className={styles.link}>
            Portfolio
          </Link>
          <Link to="/search" className={styles.link}>
            Search
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
