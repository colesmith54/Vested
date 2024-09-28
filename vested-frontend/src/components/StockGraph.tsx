import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

interface StockGraphProps {
  ticker: string;
}

interface StockDataPoint {
  date: string;
  price: number;
}

const StockGraph: React.FC<StockGraphProps> = ({ ticker }) => {
  const [data, setData] = useState<StockDataPoint[]>([]);
  const [filteredData, setFilteredData] = useState<StockDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeWindow, setTimeWindow] = useState<string>("1y");

  const theme = useTheme();

  const timeWindows: { [key: string]: number } = {
    "1y": 252,
    "6m": 126,
    "3m": 63,
    "1m": 21,
    "1w": 5,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<StockDataPoint[]>(
          `https://vested-backend.vercel.app/api/yahoo/${ticker.toLowerCase()}`
        );

        setData(response.data);
        setFilteredData(response.data);
      } catch (err: unknown) {
        setError("Failed to fetch stock data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  useEffect(() => {
    if (timeWindow === "1y") {
      setFilteredData(data);
    } else {
      const days = timeWindows[timeWindow];
      const slicedData = data.slice(-days > data.length ? 0 : -days);
      setFilteredData(slicedData);
    }
  }, [timeWindow, data, timeWindows]);

  const handleTimeWindowChange = (
    event: React.MouseEvent<HTMLElement>,
    newWindow: string | null
  ) => {
    if (newWindow !== null) {
      setTimeWindow(newWindow);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {ticker.toUpperCase()} Stock Price
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid stroke={theme.palette.divider} strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            minTickGap={20}
            tickFormatter={(dateString) => {
              const d = new Date(dateString);
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
          />

          <YAxis
            domain={["dataMin", "dataMax"]}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="linear"
            dataKey="price"
            stroke={"#4caf50"}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <ToggleButtonGroup
          value={timeWindow}
          exclusive
          onChange={handleTimeWindowChange}
          aria-label="time window"
          color="primary"
        >
          {["1y", "6m", "3m", "1m", "1w"].map((window) => (
            <ToggleButton key={window} value={window} aria-label={window}>
              {window.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default StockGraph;
