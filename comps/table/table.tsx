import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { TableProps } from "./type";

export default function Table(props: TableProps) {
  const { rows = [], headers = [] } = props;
  return (
    <TableContainer>
      <MUITable sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: "primary.main" }}>
          <TableRow>
            {headers.map((col, i) => {
              return (
                <TableCell key={i} align="left" sx={{ color: "#fff" }}>
                  {col.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map((col, j) => {
                return (
                  <TableCell align="left" key={j} component="th" scope="row">
                    {row[col.field] || col.field}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
}
