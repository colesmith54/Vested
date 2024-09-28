import React from "react";
import { TooltipProps } from "recharts";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    const date = new Date(label);
    const formattedDate = isNaN(date.getTime())
      ? label
      : date.toLocaleDateString();

    const price = payload[0].value;
    const formattedPrice =
      typeof price === "number" ? `$${price.toFixed(2)}` : price;

    return (
      <Paper
        elevation={3}
        style={{
          padding: "10px",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {formattedDate}
        </Typography>
        <Typography variant="body1" color={theme.palette.primary.main}>
          Price: {formattedPrice}
        </Typography>
      </Paper>
    );
  }

  return null;
};

export default CustomTooltip;
