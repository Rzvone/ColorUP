// PaymentForm.jsx
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, Box } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const PaymentForm = ({ onSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isCardValid, setIsCardValid] = useState(false);

  const handleCardChange = (event) => {
    setIsCardValid(event.complete);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isCardValid && stripe) {
      // Call the parent component's onSubmit function with the Stripe CardElement
      onSubmit({
        stripeCardElement: elements.getElement(CardElement),
      });
    } else {
      console.log('Invalid card details. Please check and try again.');
      // You might want to show an error message to the user here
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
              onChange={handleCardChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={!isCardValid}>
            Pay
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default PaymentForm;

