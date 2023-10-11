import { Grid, TextField, Typography, Button } from "@mui/material";
import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

const Profile = () => {
  const [value, setValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => ({
    user: state.user,
    token: state.token,
  }));

  const fetchUserData = () => {
    fetch(`http://localhost:8080/users/getUser/${userLoggedIn.user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setLogin({ user: data, token: userLoggedIn.token }));
      });
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const initialValuesDetails = {
    firstName: userLoggedIn.user.firstName,
    lastName: userLoggedIn.user.lastName,
    email: userLoggedIn.user.email,
    contactNumber: userLoggedIn.user.contactNumber,
  };

  const initialValuesPasswordChange = {
    password: "",
    confirmPassword: "",
  };

  const detailsSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    contactNumber: yup
      .string()
      .required("required")
      .matches(/^\d+$/, "Contact number must contain only digits"),
  });

  const passwordChangeSchema = yup.object().shape({
    password: yup.string().required("required"),
    confirmPassword: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const handleUpdateDetails = async (values, onSubmitProps) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/updateUser/${userLoggedIn.user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userLoggedIn.token}`,
          },
          body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            contactNumber: values.contactNumber,
          }),
        }
      );

      if (response.ok) {
        fetchUserData();
        alert("Account details updated successfully!");
      } else {
        console.error("Failed to update details:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handlePasswordChange = async (values, onSubmitProps) => {
    console.log(values);
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/reset-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passwordResetToken: userLoggedIn.token,
            newPassword: values.password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Password reset successful:", data);
        alert("Password reset successful!");
      } else {
        console.error("Password reset failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred:", error);
    }
  };

  const handleProviderRequest = async (id)=>{
    const response = await fetch(`http://localhost:8080/users/makeProvider/${id}`,{
      method:"PUT",
      
    })
  }
  return (
    <Grid container spacing={4} sx={{ marginTop: "2rem" }}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h4" color="primary">
          Hello,
        </Typography>
        <Typography variant="h4" color="secondary">
          {userLoggedIn.user.firstName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{ p: 2, maxWidth: "sm", marginLeft: "auto", marginRight: "auto" }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Account Details" {...a11yProps(0)} />
              <Tab label="Password Change" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Formik
                onSubmit={handleUpdateDetails}
                initialValues={initialValuesDetails}
                validationSchema={detailsSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  resetForm,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6} sx={{ textAlign: "initial" }}>
                        <TextField
                          label="First Name"
                          variant="outlined"
                          name="firstName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName}
                          error={
                            Boolean(touched.firstName) &&
                            Boolean(errors.firstName)
                          }
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ textAlign: "initial" }}>
                        <TextField
                          label="Last Name"
                          variant="outlined"
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName}
                          error={
                            Boolean(touched.lastName) &&
                            Boolean(errors.lastName)
                          }
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          disabled
                          sx={{ minWidth: "243px" }}
                          label="E-mail address"
                          variant="outlined"
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          error={
                            Boolean(touched.email) && Boolean(errors.email)
                          }
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Contact number"
                          variant="outlined"
                          name="contactNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.contactNumber}
                          error={
                            Boolean(touched.contactNumber) &&
                            Boolean(errors.contactNumber)
                          }
                          helperText={
                            touched.contactNumber && errors.contactNumber
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          type="submit"
                        >
                          Update Details
                        </Button>
                        
                      </Grid>
                      {userLoggedIn.user.role==="VISITOR"&&
                      <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          type="submit"
                        >
                          Request provider
                        </Button>
                      </Grid>}
                    </Grid>
                  </form>
                )}
              </Formik>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Formik
                onSubmit={handlePasswordChange}
                initialValues={initialValuesPasswordChange}
                validationSchema={passwordChangeSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  resetForm,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="New Password"
                          variant="outlined"
                          type="password"
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          error={
                            Boolean(touched.password) &&
                            Boolean(errors.password)
                          }
                          helperText={touched.password && errors.password}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Confirm Password"
                          variant="outlined"
                          type="password"
                          name="confirmPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.confirmPassword}
                          error={
                            Boolean(touched.confirmPassword) &&
                            Boolean(errors.confirmPassword)
                          }
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          color="primary"
                          type="submit"
                          fullWidth
                        >
                          Reset Password
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </TabPanel>
      
          </Box>
        </Box>
      </Grid>
    </Grid>
    
  );
};

export default Profile;
