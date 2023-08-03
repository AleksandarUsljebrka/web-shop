import { Typography, Button, Container, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { isLoggedin } from "../helpers/tokenHelper";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
const Home = () => {
  const { username, ...authContext } = useContext(AuthContext);

  const isLoggedin = authContext.isLoggedin;
  const role = isLoggedin && authContext.role.toLowerCase();
  const approvedSalesman = authContext.status?.toLowerCase() === "approved";

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
