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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Profile = () => {
  const [value, setValue] = useState(0);

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
        dispatch(setLogin({ user: {...data.user,image:data.image}, token: userLoggedIn.token }));
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
    image:null
  };

  const initialValuesPasswordChange = {
    password: "",
    confirmPassword: ""
  };

  const detailsSchema = yup.object().shape({
    firstName: yup
      .string()
      .matches(/^[A-Za-z]+$/, "First name must contain only characters")
      .required("required"),
    lastName: yup
      .string()
      .matches(/^[A-Za-z]+$/, "Last name must contain only characters")
      .required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    contactNumber: yup
      .string()
      .required("required")
      .matches(/^\d{10}$/, "Please enter a valid phone number!"),
    image: yup
      .mixed()
      .test("fileSize", "File size is too large", (value) => {
        if (value) {
          return value.size <= 1024 * 1024; // 1 MB (adjust the size limit as needed)
        }
        return true; // If no file is selected, it's considered valid
      })
      .test("fileType", "Unsupported file type", (value) => {
        if (value) {
          return value.type.startsWith("image/"); // Only allow image files
        }
        return true; // If no file is selected, it's considered valid
      }),
  });

  const passwordChangeSchema = yup.object().shape({
    password: yup.string().required("required"),
    confirmPassword: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const handleUpdateDetails = async (values, onSubmitProps) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key,value])=>{
      formData.append(`${key}`, value)
    })
    try {
      const response = await fetch(
        `http://localhost:8080/users/updateUser/${userLoggedIn.user.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userLoggedIn.token}`,
          },
          body: formData
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

  const handleProviderRequestCancel = async (id) => {
    const response = await fetch(
      `http://localhost:8080/users/makeProvider/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLoggedIn.token}`,
        },
      }
    );
    const res = await response.json();
    dispatch(setLogin({ ...userLoggedIn, user: res }));
  };

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
              variant="scrollable"
            >
              <Tab label="Account Details" {...a11yProps(0)} />
              <Tab label="Password Change" {...a11yProps(1)} />
              <Tab label="Request to become a provider" {...a11yProps(2)} />
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
                          // sx={{ minWidth: "243px" }}
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
                      <Grid item xs={12}>
                      <label>Add profile picture: </label>
                      <input 
                      id="image"
                      name="image"
                      type="file"
                      onBlur={handleBlur}
                      onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}/>
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
                    </Grid>
                  </form>
                )}
              </Formik>
              {userLoggedIn.user.role==="ROLE_VISITOR"&&
              (!userLoggedIn.user.providerRequest?
                      <Grid item xs={12} sx={{ textAlign: "center", marginTop:"1rem" }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          type="button"
                          onClick={()=>handleProviderRequestCancel(userLoggedIn.user.id)}
                        >
                          Request provider
                        </Button>
                      </Grid>:
                      <Grid item xs={12} sx={{ textAlign: "center", marginTop:"1rem" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        onClick={()=>handleProviderRequestCancel(userLoggedIn.user.id)}
                      >
                        Cancel Request provider
                      </Button>
                    </Grid>)
                      }
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
            <TabPanel value={value} index={2}>
              {userLoggedIn.user.role === "ROLE_VISITOR" &&
                (!userLoggedIn.user.providerRequest ? (
                  <Grid container spacing={4}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <Typography variant="h4">
                        Willing to join our team ?
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{ textAlign: "center", margin: "20px" }}
                      >
                        Click the button below and one member of our team will
                        contact you regarding additional details!
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", marginTop: "1rem" }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        onClick={() =>
                          handleProviderRequestCancel(userLoggedIn.user.id)
                        }
                      >
                        Request provider
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={2} sx={{ marginTop: "3rem" }}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <Typography variant="h4">
                        You have completed the application!
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", marginTop: ".7rem" }}
                    >
                      <CheckCircleIcon color="secondary" fontSize="large" />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{ textAlign: "center", margin: "20px" }}
                      >
                        Please wait for a response from our team, we'll get back
                        to you via email or by calling you on the contact number
                        provided.
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", marginTop: "1rem" }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        onClick={() =>
                          handleProviderRequestCancel(userLoggedIn.user.id)
                        }
                      >
                        Cancel provider Request
                      </Button>
                    </Grid>
                  </Grid>
                ))}
            </TabPanel>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
