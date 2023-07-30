import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import * as yup from "yup";
import useService from "../services/useService";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
});

const Login = () => {

  const { loginRequest, isLoading, error, statusCode, data } = useService();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    
  });
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      console.log(formData)
      loginRequest(formData);

      console.log("Registration successful");
    } catch (errors) {
      console.log(formData)

      const errorMessages = {};
      errors.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });
      setFormErrors(errorMessages);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Shop
          </Typography>
          
          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
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
          <Typography variant="h5" gutterBottom>
            User Sign in
          </Typography>
          <TextField
              name="username"
              label="Username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
              sx={{ marginBottom: 2, width: "100%" }}
            />
             <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              sx={{ marginBottom: 2, width: "100%" }}
            />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "100%", marginTop: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Don't have an account?{" "}
            <Link
              to="/registration"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default Login; 