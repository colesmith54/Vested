import React, { useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import styles from "../styles/Header.module.css";
import Logo from "../assets/vestedLogoCropped.png";

const Header: React.FC = () => {
  const { state, updateState } = useGlobalState();

  return (
    <Box className={styles.headerContainer}>
      <Box className={styles.logoContainer}>
        <img src={Logo} alt="Logo" className={styles.logo} />
      </Box>

      <TextField
        variant="outlined"
        size="small"
        className={styles.searchBar}
        value={state.search}
        onChange={(e) => {
          updateState({ search: e.target.value });
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                />
              </svg>
            </InputAdornment>
          ),
          style: { backgroundColor: "white" },
        }}
      />

      <Box className={styles.searchContainer}>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
