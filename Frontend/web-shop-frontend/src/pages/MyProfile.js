import { React, useState, useEffect, useContext } from "react";
import { Link, NavLink, useFetcher, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

import * as yup from "yup";
import useService from "../services/useService";
import ImageUploader from "../components/ImageUploader";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom/dist";

const userDataSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  birthdate: yup.date().required("Birth date is required"),
});
const userPasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  newPassword: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const MyProfile = () => {
  const { role, status, logKind } = useContext(AuthContext);
  const {
    getUserProfileRequest,
    getProfileImageRequest,
    updateUserRequest,
    clearRequest,
    changePasswordRequest,
    updateProfileImageRequest,
    isLoading,
    data,
    error,
    statusCode,
  } = useService();

  const [userData, setUserData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    birthdate: "",
  });
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const [fetchData, setFetchData] = useState(true);
  const [updateData, setUpdateData] = useState(false);
  const [updateImg, setUpdateImg] = useState(false);
  const [fetchImg, setFetchImg] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [formErrorsPassword, setFormErrorsPassword] = useState({});

  useEffect(() => {
    getUserProfileRequest();
  }, [getUserProfileRequest]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error && data && fetchData) {
      setFetchData(false);
      setFetchImg(true);
      setUserData(data);
      clearRequest();
      getProfileImageRequest();
      console.log("Fetched data");
    } else if (statusCode === 200 && !error && data && fetchImg) {
      setFetchImg(false);
      setProfileImage("data:image/*;base64," + data.profileImage);
      clearRequest();
      console.log("Fetched image");
    } else if (statusCode === 200 && !error && updateData) {
      setUpdateData(false);
      setFetchData(true);
      getUserProfileRequest();
      clearRequest();
      console.log("Updated profile");
    } else if (statusCode === 200 && !error && updateImg) {
      setUpdateImg(false);
      getProfileImageRequest();

      clearRequest();
      console.log("Updated image");
    } else if (statusCode === 200 && !error && updatePassword) {
      setUpdatePassword(false);
      clearRequest();
      console.log("Updated password");
    } else if (statusCode !== 200 && error && updateImg) {
      setUpdateImg(false);
      setFetchImg(true);
      getProfileImageRequest();
      console.log("SSStatusCode:" + statusCode + " Error:" + error);

      clearRequest();
    } else if (statusCode !== 200 && error) {
      console.log("AStatusCode:" + statusCode + " Error:" + error);
      clearRequest();
    }
  }, [
    isLoading,
    statusCode,
    error,
    data,
    fetchData,
    clearRequest,
    getUserProfileRequest,
    updateData,
    getProfileImageRequest,
    updatePassword,
    fetchImg,
    updateImg,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleChangePassword = (event) => {
    const { name, value } = event.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
    console.log(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userDataSchema.validate(userData, { abortEarly: false });
      console.log(userData);

      updateUserRequest(userData);

      console.log("Update successful");
    } catch (errors) {
      const errorMessages = {};
      errors.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });
      setFormErrors(errorMessages);
    }
  };
  const handleSubmitPassword = async (event) => {
    event.preventDefault();
    try {
      await userPasswordSchema.validate(userPassword, { abortEarly: false });
      console.log(userPassword);

      changePasswordRequest(userPassword);

      console.log("Update pasword successful");
    } catch (errors) {
      const errorMessages = {};
      errors.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });
      setFormErrorsPassword(errorMessages);
    }
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
          marginTop: "10px",
        }}
      >
        <Box
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            gap: 2,
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" color={"black"} gutterBottom>
            My Profile
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <ImageUploader
              image={profileImage}
              label={"Upload New Image"}
              onImageChange={(imageFile) => {
                setProfileImage(imageFile);
                setUpdateImg(true);
                updateProfileImageRequest({
                  profileImage: imageFile,
                });
              }}
              setImage={setProfileImage}
              hasSet={true}
            />
            <Box
              sx={{ justifyContent: "center", gap: "0px" }}
            >
              
              {role.toLowerCase() === "salesman" &&
                status?.toLowerCase() !== "approved" && (
                  <Typography
                    variant="h5"
                    color="secondary"
                    paddingBottom="15px"
                  >
                    Account Denied
                  </Typography>
                )}
              {role.toLowerCase() === "salesman" &&
                status?.toLowerCase() === "approved" && (
                  <Typography variant="h5" color="primary" paddingBottom="15px">
                    Account Approved
                  </Typography>
                )}
            </Box>
            {logKind.toLowerCase()==="form" && ( <Paper
              component="form"
              sx={{ marginTop: "10px", width: "30%", alignItems: "center" }}
              elevation={4}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <TextField
                  name="oldPassword"
                  placeholder="Old Password"
                  type="password"
                  variant="outlined"
                  value={userPassword.oldPassword}
                  onChange={handleChangePassword}
                  error={!!formErrorsPassword.password}
                  helperText={formErrorsPassword.password}
                  sx={{ marginBottom: 2, width: "100%" }}
                />
                <TextField
                  name="newPassword"
                  placeholder="New Password"
                  type="password"
                  variant="outlined"
                  value={userPassword.newPassword}
                  onChange={handleChangePassword}
                  error={!!formErrorsPassword.confirmPassword}
                  helperText={formErrorsPassword.confirmPassword}
                  sx={{ marginBottom: 2, width: "100%" }}
                />
                <TextField
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  type="password"
                  variant="outlined"
                  value={userPassword.confirmNewPassword}
                  onChange={handleChangePassword}
                  error={!!formErrorsPassword.confirmNewPassword}
                  helperText={formErrorsPassword.confirmNewPassword}
                  sx={{ marginBottom: 2, width: "100%" }}
                />
                <Button
                  sx={{ width: "80%", marginTop: "15px", alignSelf: "center" }}
                  variant="contained"
                  type="submit"
                  onClick={(event) => {
                    handleSubmitPassword(event);
                  }}
                >
                  Change password
                </Button>
              </Box>
            </Paper>)}
          </Box>
          <Paper
            component="form"
            sx={{ padding: "20px", width: "100%", maxWidth: "1100px" }}
            elevation={4}
          >
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
                value={userData.username}
                onChange={handleChange}
                error={!!formErrors.username}
                helperText={formErrors.username}
                sx={{ marginBottom: 2, width: "100%" }}
              />
              <TextField
                name="email"
                label="Email address"
                variant="outlined"
                value={userData.email}
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
                name="firstname"
                label="First Name"
                variant="outlined"
                value={userData.firstname}
                onChange={handleChange}
                error={!!formErrors.firstname}
                helperText={formErrors.firstname}
                sx={{ marginBottom: 2, width: "100%" }}
              />
              <TextField
                name="lastname"
                label="Last Name"
                variant="outlined"
                value={userData.lastname}
                onChange={handleChange}
                error={!!formErrors.lastname}
                helperText={formErrors.lastname}
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
                name="birthdate"
                label="Birth Date"
                variant="outlined"
                type="date"
                value={formatDate(userData.birthdate)}
                onChange={handleChange}
                error={!!formErrors.birthdate}
                helperText={formErrors.birthdate && "Birth Date is required"}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  placeholder: "YYYY-MM-DD",
                }}
                sx={{ marginBottom: 2, width: "100%" }}
              />
              <TextField
                name="address"
                label="Address"
                variant="outlined"
                value={userData.address}
                onChange={handleChange}
                error={!!formErrors.address}
                helperText={formErrors.address}
                sx={{ marginBottom: 2, width: "100%" }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%", marginTop: 2 }}
            >
              Update Profile
            </Button>
          </Paper>
        </Box>
      </Container>
    </div>
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
export default MyProfile;
