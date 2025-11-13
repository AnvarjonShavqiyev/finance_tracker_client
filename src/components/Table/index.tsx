import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Column } from "@customTypes";

import styles from "./table.module.scss";

interface CustomTableProps<T> {
  data?: T[];
  columns: Column<T>[];
}

const CustomTable = <T,>({ data = [], columns }: CustomTableProps<T>) => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <TableCell key={idx}>{col.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            data.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <TableCell key={colIdx} data-label={col.header}>
                    {col.accessor(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="body2" color="text.secondary">
                  There is no data
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
