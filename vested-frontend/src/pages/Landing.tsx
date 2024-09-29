import React from 'react';
import { Container, Typography } from '@mui/material';
import styles from '../styles/Landing.module.css';
import Logo from "../assets/vestedWhite.png";

const Landing: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: '300px', // Adjust width as needed
                height: 'auto', // Maintain aspect ratio
              }}
            />
          </div>

          <div style={{margin: 40}}>
        <Typography style={{color: "black", fontSize: 70, fontFamily: "PTSerif-Bold"}}>
            Invest in the future of humanity.
        </Typography>

        <Typography style={{color: "black", fontSize: 50, fontFamily: "PTSerif"}}>
            Picking stocks is hard, but picking stocks in companies that make the workd a better place is harder.
        </Typography>

        <Typography style={{color: "black", fontSize: 30, fontFamily: "PTSerif"}}>
            Vested gives you access to real-time data in how top U.S. companies relate to the environment, society, and government.
        </Typography>

        <Typography style={{color: "black", fontSize: 60, fontFamily: "PTSerif"}}>
            So as your investments grow, everyone grows along with it.
        </Typography>
      </div>
      </div>

    </>
  );
};

export default Landing;
