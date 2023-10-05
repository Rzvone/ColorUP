import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link as RouterLink } from "react-router-dom";

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
  });

  const handleForgotPW = async (values, onSubmitProps) => {
    setIsSuccess(true);
  };

  const initialForgotPWValue = {
    email: "",
  };

  return (
    <>
      {isSuccess ? (
        <Grid container spacing={2} sx={{ marginTop: "3rem" }}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h3">Success!</Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", marginTop: ".7rem" }}>
            <CheckCircleIcon color="secondary" fontSize="large" />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", margin: "20px" }}
            >
              If there's an account linked to the e-mail address provided, you
              shall receive an e-mail to complete the password reset process
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", margin: "20px" }}
            >
              Please make sure to check the Spam/Junk folder just in case the
              e-mail might end up there !
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <RouterLink
              to="/authentication"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button variant="outlined">Back to Log In</Button>
            </RouterLink>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginTop: "5rem" }}
            >
              Password Reset
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", margin: "20px" }}
            >
              Please enter the registration email below so we can send an email
              with the steps you'll have to follow in order to reset your
              password.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Formik
              onSubmit={handleForgotPW}
              initialValues={initialForgotPWValue}
              validationSchema={forgotPasswordSchema}
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
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{ minWidth: "300px" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ textAlign: "center", margin: "1rem" }}
                  >
                    <Button variant="outlined" type="submit">
                      Send E-mail
                    </Button>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ForgotPassword;
