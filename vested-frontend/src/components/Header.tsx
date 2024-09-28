// src/components/Header.tsx

import React from "react";
import { Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import Logo from "../assets/vestedLogo.png";

const Header: React.FC = () => {
  return (
    <Box className={styles.headerContainer}>
      <Box className={styles.logoContainer}>
        <img src={Logo} alt="Logo" className={styles.logo} />
      </Box>

      <TextField
          label="Search"
          variant="outlined"
          size="small"
          className={styles.searchBar}
        />

        
      <Box className={styles.searchContainer}>
        {/* Search Bar */}


        <Box className={styles.navLinks}>
          <Link to="/" className={styles.link}>
            Dashboard
          </Link>
          <Link to="/info/aapl" className={styles.link}>
            Info
          </Link>
          <Link to="/portfolio" className={styles.link}>
            Portfolio
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
