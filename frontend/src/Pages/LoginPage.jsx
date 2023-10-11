import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { Formik } from "formik";
import { Grid, TextField, Button } from "@mui/material";
import Register from "./Register";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";

const LoginPage = () => {
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    contactNumber: yup
      .string()
      .required("required")
      .matches(/^\d+$/, "Contact number must contain only digits"),
    password: yup.string().required("required"),
    confirmPassword: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
  });
  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  };

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  // const fetchUserData = () => {
  //   fetch('http://localhost:8080/users/getAllUsers')
  //     .then(response => response.json())
  //     .then(data => {
  //       setUsers(data);
  //     });
  // };
  
  // useEffect(() => {
  //   fetchUserData();
  // }, []);
  
  // useEffect(() => {
  //   console.log(users); // This will log the updated users state
  // }, [users]);

  const handleRegistration = async (values, onSubmitProps) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setValue(1);
        alert("Account has been created!");
      } else if (response.status === 400) {
        // Assuming status code 409 indicates email already in use
        alert("Email is already in use, please try a different email.");
      } else {
        // Handle other error cases here
        alert("An error occurred during registration.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    }
  };

  const handleLogIn = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      "http://localhost:8080/api/v1/auth/authenticate",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    const res = await savedUserResponse.json();
    console.log(res);
    if (res.token) {
      dispatch(
        setLogin({
          user: res.user,
          token: res.token,
        })
      );
      navigate("/");
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: "sm", marginLeft: "auto", marginRight: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Sign Up" {...a11yProps(0)} />
          <Tab label="Log In" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Formik
            onSubmit={handleRegistration}
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      error={
                        Boolean(touched.lastName) && Boolean(errors.lastName)
                      }
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="E-mail address"
                      variant="outlined"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
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
                      helperText={touched.contactNumber && errors.contactNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      type="password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
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
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Formik
            onSubmit={handleLogIn}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
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
                      label="Email"
                      variant="outlined"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.login_email}
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      type="password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      component={RouterLink}
                      to="/forgot-password"
                      sx={{ textDecoration: "none", color: "gray" }}
                    >
                      Forgot password ?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Log In
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default LoginPage;
