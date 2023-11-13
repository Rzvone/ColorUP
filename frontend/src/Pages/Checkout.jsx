// Checkout.jsx
import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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

const steps = ["Shipping address", "Billing address", "Payment details", "Review your order"];

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements()
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    saveAddress: false,
    addressType: "SHIPPING"
  });

  const [billingData, setBillingData] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    addressType: "BILLING"
  })

  const handleNext = (data) => {
    // Merge the current form data with the updated data
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const handleNextBilling = (data) => {
    setBillingData((prevData) => ({ ...prevData, ...data }));
    setActiveStep(prevStep => prevStep + 1);
  }

  const handleBack = () => {
    formData.saveAddress && activeStep === 2 ? setActiveStep(activeStep - 2) : setActiveStep(activeStep - 1);
  };

// Assuming you have a PaymentForm component that collects payment details and calls the backend
// ...

const handlePayment = async () => {
  try {
    // Step 1: Create PaymentIntent
    const createResponse = await fetch('http://localhost:8080/api/payment/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000,
        currency: 'usd',
      }),
    });

    if (!createResponse.ok) {
      console.error('Failed to create PaymentIntent');
      return;
    }

    const createData = await createResponse.json();
    const { clientSecret, paymentIntentId } = createData;
    console.log(createData)

    // Step 2: Confirm PaymentIntent
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error('Error creating PaymentMethod:', error);
      return;
    }

    const confirmResponse = await fetch('http://localhost:8080/api/payment/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientSecret: clientSecret,
        paymentMethodId: paymentMethod.id,
        paymentIntentId: paymentIntentId
      }),
    });

    if (confirmResponse.ok) {
      // Payment succeeded
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      // Handle payment failure
      console.error('Payment failed');
    }
  } catch (error) {
    // Handle network errors or other issues
    console.error('Error processing payment:', error);
  }
};
  
  

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm formData={formData} handleNext={handleNext} setActiveStep={setActiveStep} type="shipping" />;
      case 1:
        return <AddressForm formData={billingData} handleNext={handleNextBilling} setActiveStep={setActiveStep} type='billing' />;
      case 2:
        return (
            <PaymentForm formData={formData} setActiveStep={setActiveStep} onSubmit={handlePayment}/>
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
                {activeStep === 3 && (
                  <Button onClick={handlePayment} sx={{ mt: 3, ml: 1 }} variant="contained" color="primary">
                    Pay
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
