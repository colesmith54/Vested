import styles from "../styles/Table.module.css";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination } from "@mui/material";
import { useGlobalState } from "../GlobalState.tsx";
import axios from "axios";
import StockTableRow from "./StockTableRow.tsx";
import { useNavigate } from "react-router-dom";

interface StockRow {
  logo: string;
  name: string;
  ticker: string;
  environmental: string;
  social: string;
  governance: string;
  stockInfoUrl: string;
}

interface CsvRow {
  t: string;
  n: string;
  l: string;
  w: string;
  e: number;
  s: number;
  g: number;
  url: string
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "logo", label: "Logo", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 170, align: "left" },
  { id: "ticker", label: "Ticker", minWidth: 70, align: "left" },
  {
    id: "environmental",
    label: "Environmental",
    minWidth: 70,
    align: "right",
  },
  { id: "social", label: "Social", minWidth: 70, align: "right" },
  { id: "governance", label: "Governance", minWidth: 70, align: "right" },
  {
    id: "add",
    label: "Add",
    minWidth: 50,
    align: "center",
  },
];

const StickyHeadTable: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { state, updateState } = useGlobalState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CsvRow[]>(
          `https://vested-backend.vercel.app/api/csv`
        );

        const result = await response.data;
        const data: StockRow[] = result.map((row) => ({
          logo: row.l,
          name: row.n,
          ticker: row.t,
          environmental: row.e,
          social: row.s,
          governance: row.g,
          stockInfoUrl: row.w,
          weburl: row.url,
        }));

        updateState({ csvData: data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [updateState]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (row: StockRow) => {
    navigate(`/info/${row.ticker}`, { state: { row: row} });
  };

  return (
    <Paper className={styles.paper}>
      <TableContainer className={styles.tableContainer}>
        <MuiTable
          stickyHeader
          aria-label="sticky table"
          className={styles.table}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={styles.tableHeadCell}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.csvData
              .filter(
                (row) =>
                  row.ticker.includes(state.search.toLowerCase()) ||
                  row.name.toLowerCase().includes(state.search.toLowerCase())
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StockTableRow
                  key={row.ticker}
                  row={row}
                  onClick={() => handleRowClick(row)}
                />
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={state.csvData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StickyHeadTable;
