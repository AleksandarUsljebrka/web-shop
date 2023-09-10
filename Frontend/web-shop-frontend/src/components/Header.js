import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";

import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import AuthContext from "../context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import { ToastContainer } from 'react-toastify';

const appBarStyles = {
  backgroundColor: "#2196F3",
};

const titleStyles = {
  flexGrow: 1,
  marginLeft: "8px",
};

const Header = () => {
  const authContext = useContext(AuthContext);
  const isLoggedin = authContext.isLoggedin;
  const role = isLoggedin && authContext.role.toLowerCase();
  const approvedSalesman =
    role === "salesman" && authContext.status?.toLowerCase() === "approved";
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {false && (
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Shop
          </Typography>
          {!isLoggedin && (
            <Button color="inherit" to="/login" component={NavLink}>
              Login
            </Button>
          )}
          {!isLoggedin && (
            <Button color="inherit" to="/registration" component={NavLink}>
              Register
            </Button>
          )}
          {isLoggedin && (
            <Button color="inherit" to="/my-profile" component={NavLink}>
              My Profile
            </Button>
          )}

          {role === "admin" && (
            <Button color="inherit" to="/all-salesmen" component={NavLink}>
              All Salesmen
            </Button>
          )}

          {role === "admin" && (
            <Button color="inherit" to="/all-orders" component={NavLink}>
              All Orders
            </Button>
          )}

          {approvedSalesman && (
            <Button color="inherit" to="/articles" component={NavLink}>
              All Articles
            </Button>
          )}

          {approvedSalesman && (
            <Button color="inherit" to="/new-article" component={NavLink}>
              New Article
            </Button>
          )}

          {approvedSalesman && (
            <Button color="inherit" to="/pending-orders" component={NavLink}>
              Pending Orders
            </Button>
          )}
          {approvedSalesman && (
            <Button color="inherit" to="/finished-orders" component={NavLink}>
              Finished Orders
            </Button>
          )}
          {approvedSalesman && (
            <Button color="inherit" to="/orders-map" component={NavLink}>
              Orders Map
            </Button>
          )}

          {role === "customer" && (
            <Button color="inherit" to="/articles" component={NavLink}>
              Articles
            </Button>
          )}
          {role === "customer" && (
            <Button color="inherit" to="/order" component={NavLink}>
              Order
            </Button>
          )}
          {role === "customer" && (
            <Button color="inherit" to="/pending-orders" component={NavLink}>
              Pending Orders
            </Button>
          )}
          {role === "customer" && (
            <Button color="inherit" to="/finished-orders" component={NavLink}>
              Finished Orders
            </Button>
          )}

          {isLoggedin && (
            <Button
              color="inherit"
              to="/login"
              component={NavLink}
              onClick={(e) => {
                authContext.logout();
              }}
            >
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
        <ToastContainer
        autoClose={3000}
        toastClassName={"toaster-customization"}
      />
    </div>
  );
};
export default Header;
