import React from "react";
import {
  Typography,
  Container,
  Paper,
  Divider,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import styles from "../styles/About.module.css";
import Header from "../components/Header";

const About: React.FC = () => {
  return (
    <>
      <Header />
      <Divider color="black" />
      <div className={styles.container}>
        <Container maxWidth="lg" className={styles.content}>
          {/* ESG Cards Section */}
          <Box className={styles.esgSection} marginBottom={4}>
            <Typography
              variant="h4"
              component="h2"
              className={styles.sectionTitle}
              gutterBottom
            >
              What is ESG?
            </Typography>
            <Grid container spacing={4}>
              {/* Environmental Card */}
              <Grid item xs={12} md={4}>
                <Card
                  className={`${styles.esgCard} ${styles.esgCardEnvironmental}`}
                >
                  <CardContent className={styles.cardContentWrapper}>
                    <Typography
                      variant="h5"
                      className={styles.cardTitle}
                      gutterBottom
                    >
                      Environmental
                    </Typography>
                    <Typography variant="body2" className={styles.cardContent}>
                      Focuses on the impact of companies on the planet. This
                      includes carbon emissions, waste management, and resource
                      conservation.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Social Card */}
              <Grid item xs={12} md={4}>
                <Card className={`${styles.esgCard} ${styles.esgCardSocial}`}>
                  <CardContent className={styles.cardContentWrapper}>
                    <Typography
                      variant="h5"
                      className={styles.cardTitle}
                      gutterBottom
                    >
                      Social
                    </Typography>
                    <Typography variant="body2" className={styles.cardContent}>
                      Covers a company's relationships with employees,
                      suppliers, customers, and the communities in which it
                      operates.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Governance Card */}
              <Grid item xs={12} md={4}>
                <Card
                  className={`${styles.esgCard} ${styles.esgCardGovernance}`}
                >
                  <CardContent className={styles.cardContentWrapper}>
                    <Typography
                      variant="h5"
                      className={styles.cardTitle}
                      gutterBottom
                    >
                      Governance
                    </Typography>
                    <Typography variant="body2" className={styles.cardContent}>
                      Deals with a company's leadership, executive pay, audits,
                      internal controls, and shareholder rights.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* About Us Section */}
          <Paper elevation={3} className={styles.paper}>
            <Typography variant="h3" component="h1" className={styles.title}>
              About Us
            </Typography>
            <Typography variant="body1" gutterBottom>
              Welcome to Vested! We empower new investors with the data to make
              informed decisions about which companies to invest in based on
              their community impact and outreach efforts. By integrating
              sustainability metrics, recent news, real-time stock data, and
              Gemini-powered recommendations, we provide an educational platform
              for our users to invest in companies that align with their values.
            </Typography>

            <Divider className={styles.divider} />

            <Box className={styles.missionBox}>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1">
                Our mission is to connect new investors with companies that
                serve the community.
              </Typography>
            </Box>

            <Divider className={styles.divider} />

            <Box>
              <Typography variant="h4" gutterBottom>
                Our Team
              </Typography>
              <Typography variant="body1" gutterBottom>
                Abbhinav Sriram, Cole Smith, Sam Cohen, Ricky Zhang
              </Typography>
              <Typography variant="body2">Go Shellhacks!</Typography>
            </Box>

            <Divider className={styles.divider} />

            <Typography variant="body2" className={styles.shoutout}>
              Shoutout to Alistair King, who provided us with the starter
              dataset for this project.
            </Typography>

            <Typography variant="body2" className={styles.shoutout}>
              Please keep in mind that this is not financial advice. We are not
              financial advisors and investing in stocks always carries risk.
              Please do your own research before purchasing any stocks.
            </Typography>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default About;
