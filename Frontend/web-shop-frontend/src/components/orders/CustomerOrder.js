import React, { useContext, useEffect, useState } from "react";
import OrderContext from "../../context/OrderContext";
import useService from "../../services/useService";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Paper,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Table,
  TableContainer,
} from "@mui/material";

const CustomerOrder = () => {
  const { updateOrder, ...orderContext } = useContext(OrderContext);
  const [order, setOrder] = useState(orderContext.order);
  const [formErrors, setFormErrors] = useState({helper:''});
  const {
    postCustomerOrderRequest,
    clearRequest,
    isLoading,
    error,
    statusCode,
  } = useService();
  const navigate = useNavigate();

  useEffect(() => {
    updateOrder(order);
  }, [order, updateOrder]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error) {
      orderContext.removeOrder();
      navigate("/pending-orders");
      clearRequest();
    } else if (statusCode !== 200 && error) {
      console.log(error);
      clearRequest();
    }
  }, [isLoading, error, statusCode, navigate, orderContext, clearRequest]);

  const placeOrder = () => {
    if (order.address.length < 4) {
      setFormErrors({helper:"Address must be at least 4 characters long"});
    } else {
      if (Object.keys(order.items).length > 0) {
        postCustomerOrderRequest(orderContext.getOrderDto());
      }
    }
  };

  var totalPrice = 0;
  Object.values(order.articles).forEach((article) => {
    totalPrice += article.price * order.items[article.id];
  });
  return (
    <div>
       
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            marginTop: "-160px",
          }}
        >
          <Paper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 4,
                border: "1px solid #ccc",
                borderRadius: "8px",
                maxWidth: "600px",
                width: "100%",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <TextField
                name="commment"
                placeholder="Comment"
                variant="outlined"
                value={order?.comment}
                onChange={(e) => {
                  setOrder((old) => {
                    return { ...old, comment: e.target.value };
                  });
                }}
                sx={{ marginBottom: 2, width: "100%" }}
              />
              <TextField
                name="address"
                placeholder="Address"
                variant="outlined"
                value={order?.address || ""}
                error={!!formErrors.helper}
                helperText={formErrors.helper ? formErrors.helper : " "}
                onChange={(e) => {
                  setOrder((old) => {
                    return { ...old, address: e.target.value };
                  });
                }}
                sx={{
                    
                  marginBottom: 2,
                  width: "100%",
                  "& .MuiFormHelperText-root": {
                    color: "red", // Postavite željenu boju ovde
                  },
                }}
              />
              <TextField
                name="totalPrice"
                placeholder="Total Price"
                variant="outlined"
                type="number"
                value={totalPrice}
                disabled
                inputProps={{
                  readOnly: true,
                  style: {
                    textAlign: "center",
                    fontSize: "20px",
                  },
                }}
                sx={{ marginBottom: 2, width: "100%" }}
              />

              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%", marginTop: 2 }}
                  onClick={(event) => {
                    placeOrder();
                  }}
                >
                  Place Order
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      
      {Object.keys(order.articles).length > 0 && (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            marginTop: "-390px",
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
                    Price Per Unit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(order.articles).map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
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
                      <TextField
                        value={order.items[row.id]}
                        type="number"
                        onChange={(e) => {
                          var quantity =
                            row.quantity > e.target.value
                              ? e.target.value
                              : row.quantity;
                          setOrder((old) => {
                            const newOrder = { ...old };
                            newOrder.items[row.id] = quantity;
                            return newOrder;
                          });
                        }}
                      ></TextField>
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "18px" }}>
                      {row.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
      { Object.keys(order.items).length === 0 && (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            sx={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              marginTop: "-110px",
              padding: "20px",
              
            }}
            elevation={4}
          >
            <Typography variant="h3" color="primary">
              No items to show...
            </Typography>
          </Paper>
        </Container>
      )}
    </div>
  );
};

export default CustomerOrder;
