import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

const NotFound: React.FC = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h1">404</Typography>
            <Typography variant="h5">Page Not Found</Typography>
            <Button variant="contained" color="primary" component={Link} to="/" sx={{ mt: 3 }}>
                Go to Home
            </Button>
        </Box>
    );
};

export default NotFound;