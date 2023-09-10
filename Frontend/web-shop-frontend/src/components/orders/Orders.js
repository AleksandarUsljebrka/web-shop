import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
} from "@mui/material";
import React from "react";
const Orders = ({ data, role, button, buttonText, buttonCancel }) => {
  const userRole = role.toLowerCase();
  return (
    <>
      {data && data.length > 0 && (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <TableContainer component={Paper} elevation={4}>
            <Table
              sx={{ padding: "5px", width: "100%" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontSize: "18px" }}>
                    Id{" "}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "18px" }}>
                    Comment{" "}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "18px" }}>
                    Address
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "18px" }}>
                    Total price
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "18px" }}>
                    Time placed
                  </TableCell>
                  {userRole === "admin" && (
                    <TableCell align="center" sx={{ fontSize: "18px" }}>
                      Status
                    </TableCell>
                  )}
                  {userRole !== "admin" && (
                    <TableCell align="center" sx={{ fontSize: "18px" }}>
                      Remaining time
                    </TableCell>
                  )}

                  <TableCell
                    align="center"
                    sx={{ fontSize: "18px" }}
                    colSpan={userRole === "customer" && buttonCancel ? 2 : 1}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" align="center" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.comment}</TableCell>
                    <TableCell align="center">{row.address}</TableCell>
                    <TableCell align="center">{`$${row.totalPrice}`}</TableCell>
                    <TableCell align="center">
                      {formatDate(row.placedTime)}
                    </TableCell>
                    {userRole === "admin" && (
                      <TableCell align="center">
                        {row.remainingTime === "00:00:00"
                          ? "Finished"
                          : "In progress"}
                      </TableCell>
                    )}
                    {userRole !== "admin" && (
                      <TableCell align="center">{row.remainingTime}</TableCell>
                    )}

                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          button(row.id);
                        }}
                      >
                        {buttonText}
                      </Button>
                    </TableCell>

                    {userRole === "customer" && buttonCancel && (
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={(e) => {
                            buttonCancel(row.id);
                          }}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
      {data.length === 0 && <Typography>No orders to show...</Typography>}
    </>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  dateString = `${year}-${month}-${day}`;

  return dateString;
};
export default Orders;
