import {
  Container,
  Paper,
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText, Grid
} from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useService from "../../services/useService";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { role } = useContext(AuthContext);
  const {
    getAdminOrderDetailsRequest,
    getCustomerOrderDetailsRequest,
    getSalesmanOrderDetailsRequest,
    clearRequest,
    isLoading,
    data,
    statusCode,
    error,
  } = useService();

  useEffect(() => {
    role.toLowerCase() === "admin" && getAdminOrderDetailsRequest(id);
    role.toLowerCase() === "customer" && getCustomerOrderDetailsRequest(id);
    role.toLowerCase() === "salesman" && getSalesmanOrderDetailsRequest(id);
  }, [
    getAdminOrderDetailsRequest,
    getCustomerOrderDetailsRequest,
    getSalesmanOrderDetailsRequest,
  ]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error && data) {
      data?.items.forEach((item) => {
        item.articleImage = 'data:image/*;base64,' + item.articleImage;
      });
      setOrder(data);
      clearRequest();
    } else if (statusCode !== 200 && error) {
      console.log(error);
      clearRequest();
    }
  }, [clearRequest, isLoading, statusCode, error]);

  return (
    <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Order Details
      </Typography>
      <Divider />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Comment:
          </Typography>
          <Typography variant="body2">{order?.comment}</Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Address:
          </Typography>
          <Typography variant="body2">{order?.address}</Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Total Price:
          </Typography>
          <Typography variant="body2">{order?.totalPrice}</Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Remaining Time:
          </Typography>
          <Typography variant="body2">{order?.remainingTime}</Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Placed Time:
          </Typography>
          <Typography variant="body2">{formatDate(order?.placedTime)}</Typography>
        </Grid>
        <Grid item xs={6}>
          {order?.items.length > 0 && (
            <Container sx={{ marginTop: '30px' }}>
              <TableContainer component={Paper} elevation={4} sx={{ width: '100%' }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ArticleId</TableCell>
                      <TableCell align="center">Article image</TableCell>
                      <TableCell align="center">Article name</TableCell>
                      <TableCell align="center">Price per unit</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?.items.map((row) => (
                      <TableRow
                        key={row.articleId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" align="center" scope="row">
                          {row.articleId}
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              src={row.articleImage}
                              alt=""
                              style={{ maxWidth: '120px', maxHeight: '120px' }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="center">{row.articleName}</TableCell>
                        <TableCell align="center">{row.pricePerUnit}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          )}
        </Grid>
      </Grid>
    </CardContent>
  </Card>
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
export default OrderDetails;
