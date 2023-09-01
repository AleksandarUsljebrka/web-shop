import { Typography, Button, Container, Box, Snackbar, Alert } from "@mui/material";
import { NavLink } from "react-router-dom";
import { isLoggedin } from "../helpers/tokenHelper";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom/dist";
const Home = () => {
  const { username, ...authContext } = useContext(AuthContext);
  const [showPasswordChangeAlert, setShowPasswordChangeAlert] = useState(false);

  const isLoggedin = authContext.isLoggedin;
  const role = isLoggedin && authContext.role.toLowerCase();
  const approvedSalesman = authContext.status?.toLowerCase() === "approved";
 // const location = useLocation();
 // const isGoogleRegistered = location.state?.isGoogleRegistered;

 /* if(isGoogleRegistered){
    setShowPasswordChangeAlert(true);
  }*/
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
    
        <Typography variant="h4" gutterBottom>
          Welcome to Online Shop!
        </Typography>
        {!isLoggedin && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Please make an account to get started, if you already have one,
              sign in.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              to="/login"
              component={NavLink}
              sx={{ marginRight: 2 }}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              color="secondary"
              to="/registration"
              component={NavLink}
            >
              Make account
            </Button>
          </Box>
        )}
        {!approvedSalesman && isLoggedin && role==='salesman' &&(
          <Typography variant="h4" gutterBottom>
            Your account has not been approved!
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default Home;
