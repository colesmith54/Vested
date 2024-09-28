// src/components/Header.tsx

import React from 'react';
import { Box, TextField } from '@mui/material';
import styles from '../styles/Header.module.css';
import Logo from '../assets/vestedLogo.png';

const Header: React.FC = () => {
  return (
    <Box className={styles.headerContainer}>
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
  );
};

export default Header;
