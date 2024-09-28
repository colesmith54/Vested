import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
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
  environmental: string;
  social: string;
  governance: string;
  stockInfoUrl: string;
}

interface StockTableRowProps {
  row: StockRow;
  onClick: () => void;
}

const StockTableRow: React.FC<StockTableRowProps> = ({ row, onClick }) => {
  const { state, updateState } = useGlobalState();

  const [openDialog, setOpenDialog] = useState(false);
  const [portfolioAmount, setPortfolioAmount] = useState("");

  const handleAddToPortfolio = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPortfolioAmount("");
  };

  const handleAddPortfolioSubmit = () => {
    updateState({
      portfolioItems: [
        ...state.portfolioItems,
        {
          ticker: row.ticker.toUpperCase(),
          price: parseFloat(portfolioAmount),
          options: [row.environmental, row.social, row.governance],
        },
      ],
    });
    handleDialogClose();
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
        <TableCell align="right">{`${row.environmental}/10`}</TableCell>
        <TableCell align="right">{`${row.social}/10`}</TableCell>
        <TableCell align="right">{`${row.governance}/10`}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-controls={`menu-${row.ticker}`}
            aria-haspopup="true"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToPortfolio();
            }}
          >
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add to Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount in dollars for {row.name}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={`portfolio-amount-${row.ticker}`}
            label="Amount ($)"
            fullWidth
            variant="standard"
            value={portfolioAmount}
            onChange={(e) => setPortfolioAmount(e.target.value)}
            inputProps={{ min: "0", step: "0.01" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleAddPortfolioSubmit}
            disabled={!portfolioAmount || parseFloat(portfolioAmount) <= 0}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StockTableRow;
