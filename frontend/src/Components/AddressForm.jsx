import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

// Define validation schema using Yup
const validationSchema = yup.object({
  address1: yup.string().required('Address line 1 is required'),
  address2: yup.string(),
  city: yup.string().required('City is required'),
  state: yup.string(),
  zip: yup.string().required('Zip / Postal code is required'),
  country: yup.string().required('Country is required'),
  saveAddress: yup.boolean(),
});

// AddressForm component
const AddressForm = ({ formData, handleNext, setActiveStep, type }) => {
  // useFormik hook for form handling
  const formik = useFormik({
    initialValues: {
      address1: formData.address1 || '',
      address2: formData.address2 || '',
      city: formData.city || '',
      state: formData.state || '',
      zip: formData.zip || '',
      country: formData.country || '',
      saveAddress: formData.saveAddress || false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleNext(values);
      if(type==='shipping')values.saveAddress?setActiveStep((prevStep)=>prevStep+2):setActiveStep((prevStep)=>prevStep+1)
    },
  });

  return (
    <React.Fragment>
      {type==='shipping'?<Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>:<Typography variant="h6" gutterBottom>
        Billing address
      </Typography>}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address1}
              error={formik.touched.address1 && Boolean(formik.errors.address1)}
              helperText={formik.touched.address1 && formik.errors.address1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address2}
              error={formik.touched.address2 && Boolean(formik.errors.address2)}
              helperText={formik.touched.address2 && formik.errors.address2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zip}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
         { type==='shipping'&&<Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="saveAddress"
                  checked={formik.values.saveAddress}
                  onChange={formik.handleChange}
                />
              }
              label="Use this address for payment details"
            />
          </Grid>}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
            Next
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default AddressForm;
