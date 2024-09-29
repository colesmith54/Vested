import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import styles from "../styles/Header.module.css";
import Logo from "../assets/vestedLogoCropped.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { state, updateState } = useGlobalState();
  const navigate = useNavigate();

  return (
    <Box className={styles.headerContainer}>
      <Box className={styles.logoContainer}>
        <img
          src={Logo}
          alt="Logo"
          className={styles.logo}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      </Box>

      <TextField
        variant="outlined"
        size="small"
        className={styles.searchBar}
        value={state.search}
        onChange={(e) => {
          updateState({ search: e.target.value });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && state.search.trim() !== "") {
            navigate("/");
          }
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
          <Link to="/about" className={styles.link}>
          About
          </Link>
          <Link to="/portfolio" className={styles.link}>
            Portfolio
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24" // Adjust the size as needed
              height="24"
              viewBox="0 0 89 78"
              fill="none"
              style={{ marginLeft: "8px", verticalAlign: "middle" }} // Add margin to create space between text and SVG
            >
              {/* Remove the rect element to eliminate the surrounding rectangle */}
              <path
                d="M80.6562 41.4375V68.25H8.34375V41.4375M44.5 53.625V43.875M55.625 19.5C55.625 19.5 55.625 9.75 44.5 9.75C33.375 9.75 33.375 19.5 33.375 19.5M5.5625 19.5H83.4375V39C83.4375 39 66.75 48.75 44.5 48.75C22.25 48.75 5.5625 39 5.5625 39V19.5Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
