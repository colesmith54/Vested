import styles from "../styles/Table.module.css";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination, TableSortLabel } from "@mui/material";
import { useGlobalState } from "../GlobalState.tsx";
import axios from "axios";
import StockTableRow from "./StockTableRow.tsx";
import { useNavigate } from "react-router-dom";

// Define the possible order directions
type Order = "asc" | "desc";

// Define the structure of a stock row
interface StockRow {
  logo: string;
  name: string;
  ticker: string;
  environmental: string;
  social: string;
  governance: string;
  stockInfoUrl: string;
}

// Define the structure of a CSV row from the backend
interface CsvRow {
  t: string;
  n: string;
  l: string;
  w: string;
  e: number;
  s: number;
  g: number;
  url: string;
}

// Define the structure of a table column
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  sortable?: boolean; // Add a sortable property
  format?: (value: number) => string;
}

// Define the columns, marking score columns as sortable
const columns: readonly Column[] = [
  { id: "logo", label: "Logo", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 170, align: "left" },
  { id: "ticker", label: "Ticker", minWidth: 70, align: "left" },
  {
    id: "environmental",
    label: "Environmental",
    minWidth: 70,
    align: "right",
    sortable: true, // Make sortable
  },
  {
    id: "social",
    label: "Social",
    minWidth: 70,
    align: "right",
    sortable: true, // Make sortable
  },
  {
    id: "governance",
    label: "Governance",
    minWidth: 70,
    align: "right",
    sortable: true, // Make sortable
  },
  {
    id: "action",
    label: "Add/Edit",
    minWidth: 50,
    align: "center",
  },
];

// Utility function to convert rank to a score out of 10
const rankToTen = (sortedValues: number[], value: number): string => {
  const total = sortedValues.length;

  const firstIndex = sortedValues.findIndex((v) => v === value);
  const lastIndex = sortedValues.lastIndexOf(value);
  const averageRank = (firstIndex + lastIndex) / 2;

  const score = (averageRank / (total - 1)) * 10;
  return score.toFixed(1);
};

// Comparator function for sorting
const getComparator = (order: Order, orderBy: string) => {
  return order === "desc"
    ? (a: StockRow, b: StockRow) => descendingComparator(a, b, orderBy)
    : (a: StockRow, b: StockRow) => -descendingComparator(a, b, orderBy);
};

// Descending comparator
const descendingComparator = (a: StockRow, b: StockRow, orderBy: string) => {
  let aValue: number = parseFloat(a[orderBy as keyof StockRow] as string);
  let bValue: number = parseFloat(b[orderBy as keyof StockRow] as string);

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
};

// Function to sort an array stably
const stableSort = (
  array: StockRow[],
  comparator: (a: StockRow, b: StockRow) => number
) => {
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [StockRow, number]
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const StickyHeadTable: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // **Initialize sorting state without default sorting**
  const [order, setOrder] = React.useState<Order>("desc"); // Default value can be 'asc' or 'desc'; it will be set upon sorting
  const [orderBy, setOrderBy] = React.useState<string>(""); // No column sorted initially

  const { state, updateState } = useGlobalState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CsvRow[]>(
          `https://vested-backend.vercel.app/api/csv`
        );

        const result = response.data;

        // Extract scores for each category and sort them
        const environmentalScores = [...result.map((row) => row.e)].sort(
          (a, b) => a - b
        );
        const socialScores = [...result.map((row) => row.s)].sort(
          (a, b) => a - b
        );
        const governanceScores = [...result.map((row) => row.g)].sort(
          (a, b) => a - b
        );

        const data: StockRow[] = result.map((row) => ({
          logo: row.l,
          name: row.n,
          ticker: row.t,
          environmental: rankToTen(environmentalScores, row.e),
          social: rankToTen(socialScores, row.s),
          governance: rankToTen(governanceScores, row.g),
          stockInfoUrl: row.w,
        }));

        updateState({ csvData: data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [updateState]);

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Handle row click
  const handleRowClick = (row: StockRow) => {
    navigate(`/info/${row.ticker}`, { state: { row: row } });
  };

  // Handle sort request
  const handleRequestSort = (property: string) => {
    if (orderBy !== property) {
      // If clicking a new column, sort descending first
      setOrder("desc");
      setOrderBy(property);
    } else {
      // If clicking the same column, toggle the sort order
      const isAsc = order === "asc";
      setOrder(isAsc ? "desc" : "asc");
    }
  };

  // Prepare sorted data
  const sortedData = React.useMemo(() => {
    if (orderBy) {
      return stableSort(state.csvData, getComparator(order, orderBy));
    }
    return state.csvData;
  }, [state.csvData, order, orderBy]);

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
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "desc"} // When active, show current order; else, default to 'desc' for hint
                      onClick={() => handleRequestSort(column.id)}
                      // Set the direction to 'desc' if not active, to indicate the next sort direction
                      // Material-UI automatically toggles the direction when active
                      // This ensures that initial sort upon clicking an unsorted column is descending
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .filter(
                (row) =>
                  row.ticker
                    .toLowerCase()
                    .includes(state.search.toLowerCase()) ||
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
        count={
          state.csvData.filter(
            (row) =>
              row.ticker.toLowerCase().includes(state.search.toLowerCase()) ||
              row.name.toLowerCase().includes(state.search.toLowerCase())
          ).length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StickyHeadTable;
