// src/components/About.tsx

import React from 'react';
import { Typography, Container, Paper, Divider, Box } from '@mui/material';
import styles from '../styles/About.module.css';
import Header from "../components/Header";

const About: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Container maxWidth="md" className={styles.content}>
          <Paper elevation={3} className={styles.paper}>
            <Typography variant="h3" component="h1" className={styles.title}>
              About Us
            </Typography>
            <Typography variant="body1" gutterBottom>
              Welcome to Vested. Investing responsibly is tough, but we make it as easy as vest.
              We help you track the environmental impact of your investments by making information available at your fingertips,
              and donating profits to relevant charities.
            </Typography>

            <Divider className={styles.divider} />

            <Box className={styles.missionBox}>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1">
                Our mission is to make responsible investing easy. We strive to provide users with an accurate perception of the companies they choose to support.
              </Typography>
            </Box>

            <Divider className={styles.divider} />

            <Box>
              <Typography variant="h4" gutterBottom>
                Our Team
              </Typography>
              <Typography variant="body1" gutterBottom>
                Our team consists of experienced professionals in computer science and finance. Abhinav Sriram, Cole Smith, Sam Cohen, Ricky Zhang are the GOATs.
              </Typography>
              <Typography variant="body1">
                Each team member brings unique skills and perspectives to the table, making us stronger as a team. With our balance in frontend, backend and design, we are able to create a seamless Shellhacks experience.
              </Typography>
            </Box>

            <Divider className={styles.divider} />

            <Box className={styles.contact}>
              <Typography variant="h4" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1">
                Have any questions or want to get in touch? Reach out to us at{' '}
                <a href="mailto:info@vested.com" className={styles.email}>
                  info@vested.com
                </a>
              </Typography>
            </Box>

            <Typography variant="body2" className={styles.shoutout}>
              Shoutout to Alistair King, who provided us with the starter dataset for this project.
            </Typography>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default About;
