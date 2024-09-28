import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useGlobalState } from '../GlobalState';
import { Typography, Box, Alert } from '@mui/material';
import styles from '../styles/Info.module.css'; 

interface CsvDataItem {
    ticker: string;
    name: string;
    price: number;
}

const Info: React.FC = () => {
    const { ticker } = useParams<{ ticker: string }>();

    const { state } = useGlobalState();
    const [csvItem, setCsvItem] = useState<CsvDataItem | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (ticker && state.csvData.length > 0) {
            const foundItem = state.csvData.find(
                (item: CsvDataItem) => item.ticker.toLowerCase() === ticker.toLowerCase()
            );
            
            if (foundItem) {
                setCsvItem(foundItem);
                console.log('Found item:', foundItem);
            } else {
                navigate('/not-found');
            }
        }
    }, [ticker, state.csvData, navigate]);

    if (!csvItem) {
        return (
            <Box p={2}>
                <Alert severity="warning">
                    {ticker ? `No data found for ticker: ${ticker.toUpperCase()}` : 'Loading data...'}
                </Alert>
            </Box>
        );
    }

    console.log("csvItem", csvItem);
    return (
        <div className={styles.infoContainer}>
            <Typography variant="h4">
                {csvItem.name} ({csvItem.ticker.toUpperCase()})
            </Typography>
            <Typography variant="h6">Price: ${csvItem.price}</Typography>
        </div>
    );
};

export default Info;