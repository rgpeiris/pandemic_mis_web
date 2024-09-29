import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import moment from "moment";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EBEBEB",
    color: "#15181A",
    fontWeight: "bold",
    fontSize: "15px",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "#696969",
  },
}));

const SimpleTable = ({ columns, rows, isMobile }) => {
  return (
    <Grid item sm={12} xs={12}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: isMobile ? 200 : 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.field}>
                  {column.columnName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  There are no records available
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  key={index.toString()}
                  data-testid="data-rows"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {column.field === "createdDate" ||
                      column.field === "updatedDate" ||
                      column.field === "registrationDate" ||
                      column.field === "confirmedDate" ||
                      column.field === "dateScheduled" ||
                      column.field === "dateOfVaccination" ||
                      column.field === "dateOfPandemicTest" ||
                      column.field === "examinedDate" ? (
                        <>
                          {row[column.field] &&
                            moment(row[column.field]).format("DD-MMM-YYYY")}
                        </>
                      ) : column.field === "isActive" ? (
                        <>{row[column.field] ? "Active" : "Inactive"}</>
                      ) : column.field === "checkInTime" ||
                        column.field === "checkOutTime" ? (
                        <>
                          {row[column.field] &&
                            moment(row[column.field]).format("DD-MMM-YYYY") +
                              " " +
                              row[column.field]?.split("T")[1]?.split(".")[0]}
                        </>
                      ) : (
                        row[column.field]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

SimpleTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  isMobile: PropTypes.bool,
};

export default SimpleTable;
