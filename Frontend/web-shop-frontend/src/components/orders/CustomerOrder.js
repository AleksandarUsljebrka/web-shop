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

import { PaypalCheckoutButton } from "../PaypalCheckoutButton";

const CustomerOrder = () => {
  const [isCashOnDeliveryChecked, setCashOnDeliveryChecked] = useState(false);
  const { updateOrder, setOrderPaid, isPaid, ...orderContext } =
    useContext(OrderContext);
  const [order, setOrder] = useState(orderContext.order);
  const [formErrors, setFormErrors] = useState({ helper: "" });
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
    // updateOrder na prazan objekat jer ti vise ne treba to, poruceno je
    // redirekcija na stranicu da je "Success, all is paid for"
    // i posle korisnik bira iz navigacije
    // postavi isPaid na false
    if (isPaid) {
      alert("Thank you for your purchase!");
      setOrderPaid(false);
      placeOrder();
    }
  }, [isPaid, setOrderPaid, updateOrder]);

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
    if (Object.keys(order.items).length > 0) {
      var placedOrder = orderContext.getOrderDto();
      // order = { ...order, isPaid };
      postCustomerOrderRequest(placedOrder);
    }
  };

  var totalPrice = 0;
  Object.values(order.articles).forEach((article) => {
    totalPrice += article.price * order.items[article.id];
  });

  const handleCashOnDeliveryChange = () => {
    setCashOnDeliveryChecked(!isCashOnDeliveryChecked);
    setOrderPaid(true);
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          marginTop: "-80px",
          gap: 5,
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
                  color: "red",
                },
              }}
            />
            <TextField
              name="totalPrice"
              placeholder="Total Price"
              variant="outlined"
              type="text"
              value={`$${totalPrice}`}
              disabled
              inputProps={{
                readOnly: true,
                style: {
                  textAlign: "center",
                  fontSize: "20px",
                },
              }}
              sx={{ marginBottom: 2, width: "100%" }}
              helperText="Note: An additional amount for delivery is 3$."
            />
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: 2,
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Button
                  disabled={order.address.length < 4}
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "100%",
                    marginTop: 0,
                    backgroundColor: "#616161",
                  }}
                  onClick={(event) => {
                    placeOrder();
                  }}
                >
                  Cash on Delivery
                </Button>
              </Box>
              <PaypalCheckoutButton
                isDisabled={order.address.length < 4}
                orderPrice={totalPrice}
              ></PaypalCheckoutButton>
            </Container>
           
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
      {Object.keys(order.items).length === 0 && (
        <Container
          sx={{ color: "black", display: "flex", justifyContent: "center" }}
        >
          <Paper
            sx={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              marginTop: "-110px",
              padding: "20px",
              color: "black",
              backgroundColor: "#424242",
            }}
            elevation={4}
          >
            <Typography variant="h3" color="white">
              No items to show...
            </Typography>
          </Paper>
        </Container>
      )}
    </div>
  );
};

export default CustomerOrder;
