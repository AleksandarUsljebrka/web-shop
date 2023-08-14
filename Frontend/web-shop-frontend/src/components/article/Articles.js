import { useContext } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Box, Typography } from "@mui/material";

import OrderContext from "../../context/OrderContext";

const Articles = ({ data, buttonFunction, buttonText }) => {
  const orderContext = useContext(OrderContext);

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
                  <TableCell align="center" sx={{ fontSize: "22px" }}>
                    Article Image
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "22px" }}>
                    Id
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "22px" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "22px" }}>
                    Description
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "22px" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "22px" }}>
                    Price
                  </TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" align="center" scope="row">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={row.productImage}
                          alt=""
                          style={{ maxWidth: "140px", maxHeight: "140px" }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "18px" }}>
                      {row.id}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "18px" }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "18px" }}>
                      {row.description}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "18px" }}>
                      {row.quantity}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "18px" }}>
                      {row.price}
                    </TableCell>
                    {!orderContext.hasArticleWithId(row.id) && (
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          onClick={(e) => {
                            buttonFunction(row);
                          }}
                        >
                          {buttonText}
                        </Button>
                      </TableCell>
                    )}
                    {orderContext.hasArticleWithId(row.id) && (
                      <TableCell align="center">Article added</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
      {data.length === 0 && (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            sx={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              marginTop: "10vh",
              padding: "20px",
            }}
            elevation={4}
          >
            <Typography variant="h3" color="primary">
              No articles to show...
            </Typography>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default Articles;
