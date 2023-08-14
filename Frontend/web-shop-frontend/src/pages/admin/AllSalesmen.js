import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Container,
  Box
} from "@mui/material";
import useService from "../../services/useService";

const AllSalesmen = () => {
  const {
    data,
    error,
    statusCode,
    isLoading,
    getAllSalesmenRequest,
    updateSalesmanStatusRequest,
    clearRequest,
  } = useService();

  const [updateStatus, setUpdateStatus] = useState(false);
  const [fetchedSalesmen, setFetchedSalesmen] = useState(true);
  const [salesmen, setSalesmen] = useState([]);

  useEffect(() => {
    getAllSalesmenRequest();
  }, [getAllSalesmenRequest]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error && updateStatus) {
      setUpdateStatus(false);
      getAllSalesmenRequest();
      setFetchedSalesmen(true);
      clearRequest();
    } else if (statusCode === 200 && !error&& data && fetchedSalesmen) {
      setFetchedSalesmen(false);
      setSalesmen(data?.salesmen);
      data?.salesmen.forEach((salesman) => {
        salesman.salesmanProfileImage =
          'data:image/*;base64,' + salesman.salesmanProfileImage;
      });
      clearRequest();
    } else if (statusCode !== 200 && error) {
      console.log("Error: " + error);
      console.log("StatusCode: " + statusCode);
    }
  }, [
    isLoading,
    statusCode,
    error,
    updateStatus,
    data,
    fetchedSalesmen,
    getAllSalesmenRequest,
    clearRequest,
  ]);
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="Salesman Table">
            <TableHead>
              <TableRow>
              <TableCell>Profile Image</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Firstname</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesmen && salesmen.map((salesman) => (
                <TableRow key={salesman.username}>
                  <TableCell component='th' align='center' scope='row'>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={salesman.salesmanProfileImage}
                        alt=''
                        style={{ maxWidth: '120px', maxHeight: '120px' }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{salesman.username}</TableCell>
                  <TableCell>{salesman.email}</TableCell>
                  <TableCell>{salesman.firstname}</TableCell>
                  <TableCell>{salesman.lastname}</TableCell>
                  <TableCell>{salesman.address}</TableCell>
                  <TableCell>{formatDate(salesman.birthdate)}</TableCell>
                  {salesman.approvalStatus > 0 && (
                    <TableCell align="center" colSpan={2}>
                      <Typography
                        color={
                          getStatusString(salesman.approvalStatus) ===
                          "Approved"
                            ? "primary"
                            : "secondary"
                        }
                      >
                        {getStatusString(salesman.approvalStatus)}
                      </Typography>
                    </TableCell>
                  )}
                
              {salesman.approvalStatus === 0 && (
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      setUpdateStatus(true);
                      updateSalesmanStatusRequest({
                        ApprovalStatus: true,
                        Username: salesman.username,
                      });
                     
                    }}
                  >
                    Approve
                  </Button>
                </TableCell>
              )}
              {getStatusString(salesman.approvalStatus) === "Pending" && (
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => {
                      setUpdateStatus(true);
                      updateSalesmanStatusRequest({
                        ApprovalStatus: false,
                        Username: salesman.username,
                      });
                    }}
                  >
                    Deny
                  </Button>
                </TableCell>
              )}
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

const getStatusString = (approval) => {
  switch (approval) {
    case 0:
      return "Pending";
    case 1:
      return "Approved";
    case 2:
      return "Denied";
    default:
      return "Unknown";
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  dateString = `${year}-${month}-${day}`;

  return dateString;
};
export default AllSalesmen;
