import React from 'react';
import { Container, Typography } from '@mui/material';
import styles from '../styles/Landing.module.css';
import Logo from "../assets/vestedWhite.png";
import { useGlobalState } from "../GlobalState";

import {
    Button,
  } from "@mui/material";
  import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



const Landing: React.FC = () => {

    const { state, updateState } = useGlobalState();

  return (
    <>
      <div className={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: '200px', // Adjust width as needed
                height: 'auto', // Maintain aspect ratio
              }}
            />
          </div>

          <div style={{margin: 40}}>
        <Typography style={{color: "black", fontSize: 70, fontFamily: "PTSerif-Bold"}}>
            Invest in the future of humanity.
        </Typography>

        <Typography style={{color: "black", fontSize: 30, fontFamily: "PTSerif", marginTop: 40}}>
            Picking stocks is hard, but picking stocks in companies that make the world a better place is harder.
        </Typography>

        <Typography style={{color: "black", fontSize: 22, fontFamily: "PTSerif-Italic", }}>
            That's why Vested gives you access to real-time data on how top U.S. companies relate to the environment, society, and government.
        </Typography>

        <Typography style={{color: "black", fontSize: 30, fontFamily: "PTSerif", marginTop: 60}}>
            We're the world's first sustainability-based tool that lets you build your own portfolio from scratch, allowing you to take stock of, well, your stocks.
        </Typography>

        <Typography style={{color: "black", fontSize: 50, fontFamily: "PTSerif-Bold",}}>
            So as your investments grow, the world grows along.
        </Typography>
      </div>

      <Button
          variant="contained"
          sx={{ backgroundColor: "#086300" }}
          onClick={() => {console.log(state.isLanding); updateState({isLanding: false});}}
          endIcon={<ArrowForwardIcon />}
        >
          Try it out
        </Button>
      </div>

    </>
  );
};

export default Landing;
