import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { TablePagination } from '@mui/material';

interface Column {
  id: 'name' | 'ticker' | 'amountBought' | 'environmental' | 'sustainable' | 'governance' | 'stockInfoUrl';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'ticker', label: 'Ticker', minWidth: 100 },
  { id: 'amountBought', label: 'Amount Bought (in $)', minWidth: 170, align: 'right' },
  { id: 'environmental', label: 'Environmental', minWidth: 170, align: 'right' },
  { id: 'sustainable', label: 'Sustainable', minWidth: 170, align: 'right' },
  { id: 'governance', label: 'Governance', minWidth: 170, align: 'right' },

  { id: 'stockInfoUrl', label: 'Profile', minWidth: 170, align: 'center' }, // New column for the button
];

interface Data {
  name: string;
  ticker: string;
  amountBought: number;
  environmental: number;
  sustainable: number;
  governance: number;
  stockInfoUrl: string;

}

function createData(
  name: string,
  ticker: string,
  amountBought: number,
  environmental: number,
  sustainable: number,
  governance: number,
  stockInfoUrl?: string
): Data {
  return { name, ticker, amountBought, environmental, sustainable, governance, stockInfoUrl: '/profile/' + ticker };
}

const rows = [
  createData('Apple', 'AAPL', 132, 100, 100, 100),

];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleButtonClick = (profileUrl: string) => {
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.ticker}>
                    {columns.map((column) => {
                      if (column.id === 'stockInfoUrl') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleButtonClick(row.stockInfoUrl)}
                            >
                              View Profile
                            </Button>
                          </TableCell>
                        );
                      } else {
                        const value = row[column.id as keyof Data];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
