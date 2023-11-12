import React, { useState } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "../Components/AddressForm";
import PaymentForm from "../Components/PaymentForm";
import Review from "../Components/Review";
import SimpleFooter from "../Components/SimpleFooter";
import { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const steps = ["Shipping address", "Billing address", "Payment details", "Review your order"];
const stripePromise = loadStripe('your-publishable-key');

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    saveAddress: false,
    addressType:"SHIPPING"
    // Add payment and review form data as needed
  });

  const [billingData,setBillingData] = useState({
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      addressType:"BILLING"
      // Add payment and review form data as needed
  })

  console.log(formData)
  console.log(billingData)
  const handleNext = (data) => {
    // Merge the current form data with the updated data
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

const handleNextBilling = (data) =>{
  setBillingData((prevData) => ({ ...prevData, ...data }));
  setActiveStep(prevStep=>prevStep+1);
}

  const handleBack = () => {
    formData.saveAddress&&activeStep===2?setActiveStep(activeStep - 2):setActiveStep(activeStep - 1);
  };
  const handleSubmit = () => {
    if(formData.saveAddress)setBillingData(formData)
    console.log('Final Form Data:', formData);
    // You can send the formData to your backend or perform other actions here
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm formData={formData} handleNext={handleNext} setActiveStep={setActiveStep} type="shipping"/>;
      case 1:
        return <AddressForm formData={billingData} handleNext={handleNextBilling} setActiveStep={setActiveStep} type='billing'/>;
      case 2:  
        return (
          <Elements stripe={stripePromise}>
            <PaymentForm formData={formData} handleNext={handleNext} />
          </Elements>
        );
      case 3:
        return <Review formData={formData} />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order confirmation, 
                and will send you an update when your order has shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
      <SimpleFooter />
    </React.Fragment>
  );
}
