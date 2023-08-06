import { React, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import Header from "../components/Header";

const registrationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  birthDate: yup.date().required("Birth date is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  role: yup
    .string()
    .oneOf(["Customer", "Salesman"], "Invalid role")
    .required("Role is required"),
});

const Registration = () => {
  const { registerRequest, isLoading, error, statusCode } = useService();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registrationSchema.validate(formData, { abortEarly: false });
      console.log(formData)
      registerRequest(formData);

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
  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error) {
      navigate('/login');
    }
  }, [isLoading, statusCode, error, navigate]);

  return (
    <div>
      
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
          <Typography variant="h5" color={"black"} gutterBottom>
            User Registration
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
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
              name="email"
              label="Email address"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              sx={{ marginBottom: 2, width: "100%" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
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
            <TextField
              name="confirmPassword"
              label="Password Confirm"
              type="password"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              sx={{ marginBottom: 2, width: "100%" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              value={formData.firstName}
              onChange={handleChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              sx={{ marginBottom: 2, width: "100%" }}
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={formData.lastName}
              onChange={handleChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
              sx={{ marginBottom: 2, width: "100%" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              name="birthDate"
              label="Birht Date"
              variant="outlined"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              error={!!formErrors.birthDate}
              helperText={formErrors.birthDate}
              sx={{ marginBottom: 2, width: "100%" }}
            />
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              value={formData.address}
              onChange={handleChange}
              error={!!formErrors.address}
              helperText={formErrors.address}
              sx={{ marginBottom: 2, width: "100%" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <FormControl
              variant="outlined"
              sx={{ marginBottom: 2, width: "100%" }}
            >
              <InputLabel >Role</InputLabel>
              <Select 
                name="role"
                label="Role"
                value={formData.role}
                onChange={handleChange}
                error={!!formErrors.role}
                helperText={formErrors.role}
              >
                <MenuItem value="Salesman">Salesman</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "100%", marginTop: 2 }}
          >
            Register
          </Button>
          <Typography color={"black"} variant="body2" sx={{ marginTop: 2 }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Registration;
