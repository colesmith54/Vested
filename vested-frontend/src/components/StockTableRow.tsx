import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../styles/Table.module.css";
import { useGlobalState } from "../GlobalState.tsx";
import ImageWithFallback from "./ImageWithFallback.tsx";

interface StockRow {
  logo: string;
  name: string;
  ticker: string;
  environmental: string; // e.g., "3.5/10"
  social: string; // e.g., "4.2/10"
  governance: string; // e.g., "2.8/10"
  stockInfoUrl: string;
}

interface StockTableRowProps {
  row: StockRow;
  onClick: () => void;
}

const colorMapping: { [key: number]: string } = {
  0: "#ff6b6b",
  1: "#ff6b6b",
  2: "#ff6b6b",
  3: "#ff8c00",
  4: "#ff8c00",
  5: "#ffd700",
  6: "#ffd700",
  7: "#a8dd00",
  8: "#a8dd00",
  9: "#00AF4D",
  10: "#00AF4D",
};

const getColor = (value: number): string => {
  const floor = Math.floor(value);
  return colorMapping[floor] || "#000000";
};

const StockTableRow: React.FC<StockTableRowProps> = ({ row, onClick }) => {
  const { state, updateState, removeStock } = useGlobalState();
  const { portfolioItems } = state;

  const [openDialog, setOpenDialog] = useState(false);
  const [portfolioAmount, setPortfolioAmount] = useState("");

  const handleAddToPortfolio = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPortfolioAmount("");
  };

  const handleAddPortfolioSubmit = (edit: boolean = false) => {
    if (!edit) {
      updateState({
        portfolioItems: [
          ...portfolioItems,
          {
            ...row,
            price: parseFloat(portfolioAmount),
            options: [row.environmental, row.social, row.governance],
          },
        ],
      });
    } else {
      updateState({
        portfolioItems: portfolioItems.map((item) =>
          item.ticker === row.ticker
            ? {
                ...item,
                price: parseFloat(portfolioAmount),
                options: [row.environmental, row.social, row.governance],
              }
            : item
        ),
      });
    }
    handleDialogClose();
  };

  const renderScore = (score: string) => {
    const value = parseFloat(score);
    const color = getColor(value);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "2em", color: color, fontWeight: "bold" }}>
          {value.toFixed(1)}
        </span>
        <span style={{ marginLeft: "4px", color: "#555", marginTop: "8px" }}>
          /10
        </span>
      </div>
    );
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={row.ticker} onClick={onClick}>
        <TableCell align="center">
          <ImageWithFallback
            src={row.logo}
            alt={`${row.name} Logo`}
            className={styles.logo}
            height={30}
          />
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.ticker.toUpperCase()}</TableCell>
        <TableCell align="right">{renderScore(row.environmental)}</TableCell>
        <TableCell align="right">{renderScore(row.social)}</TableCell>
        <TableCell align="right">{renderScore(row.governance)}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-controls={`menu-${row.ticker}`}
            aria-haspopup="true"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToPortfolio();
            }}
          >
            {state.portfolioItems.find((item) => item.ticker === row.ticker) ? (
              <EditIcon />
            ) : (
              <AddIcon />
            )}
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          <DialogTitle>
            {state.portfolioItems.find((item) => item.ticker === row.ticker)
              ? "Edit Portfolio Item"
              : "Add to Portfolio"}
          </DialogTitle>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {state.portfolioItems.find((item) => item.ticker === row.ticker)
              ? `Edit the amount in dollars for ${row.name}.`
              : `Enter the amount in dollars for ${row.name}.`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={`portfolio-amount-${row.ticker}`}
            label="Amount ($)"
            fullWidth
            type="number"
            variant="standard"
            value={portfolioAmount}
            onChange={(e) => setPortfolioAmount(e.target.value)}
            inputProps={{ min: "0", step: "0.01" }}
          />
        </DialogContent>
        <DialogActions>
          {state.portfolioItems.find((item) => item.ticker === row.ticker) ? (
            <Button
              onClick={() => {
                removeStock(row.ticker);
                handleDialogClose();
              }}
              sx={{
                color: "#ff6b6b",
                ":hover": { backgroundColor: "rgba(255, 107, 107, 0.35)" },
              }}
            >
              Remove
            </Button>
          ) : null}
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={() =>
              handleAddPortfolioSubmit(
                state.portfolioItems.find((item) => item.ticker === row.ticker)
              )
            }
            disabled={!portfolioAmount || parseFloat(portfolioAmount) <= 0}
          >
            {state.portfolioItems.find((item) => item.ticker === row.ticker)
              ? "Edit"
              : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StockTableRow;
