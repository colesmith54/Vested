import styles from "../styles/Table.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { TablePagination } from "@mui/material";
import { useGlobalState } from "../GlobalState.tsx";
import axios from "axios";

interface StockRow {
  name: string;
  ticker: string;
  environmental: string;
  sustainable: string;
  governance: string;
}

interface CsvRow {
  t: string;
  n: string;
  l: string;
  w: string;
  e: number;
  s: number;
  g: number;
}

interface Column {
  id: "name" | "ticker" | "environmental" | "sustainable" | "governance";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "ticker", label: "Ticker", minWidth: 100 },
  {
    id: "environmental",
    label: "Environmental",
    minWidth: 170,
    align: "right",
  },
  { id: "sustainable", label: "Sustainable", minWidth: 170, align: "right" },
  { id: "governance", label: "Governance", minWidth: 170, align: "right" },
];

const StickyHeadTable: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const handleButtonClick = (stockInfoUrl: string) => {
    navigate(stockInfoUrl);
  };

  const { state, updateState } = useGlobalState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CsvRow[]>(
          `https://vested-backend.vercel.app/api/csv`
        );

        const result = await response.data;
        const data: StockRow[] = result.map((row) => ({
          name: row.n,
          ticker: row.t,
          environmental: `${String(row.e)}/10`,
          sustainable: `${String(row.s)}/10`,
          governance: `${String(row.g)}/10`,
        }));

        updateState({ csvData: data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                console.log(row);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.ticker}
                  >
                    {columns.map((column) => {
                      const value = row[column.id as keyof StockRow];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
