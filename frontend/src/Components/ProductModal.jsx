import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { InputLabel, TextField } from '@mui/material';
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from "formik";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProductModal({open, handleClose, product}) {

  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .required('Quantity is required')
      .integer('Quantity must be an integer')
      .min(1, 'Quantity must be at least 1')
      .max(Yup.ref('maxStock'), 'Quantity cannot exceed the product stock'),
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {product.name}
          </Typography>
          <Formik
            initialValues={{ quantity: 1, maxStock: product.stock }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Handle the form submission here (e.g., add to cart)
              console.log('Submitted:', values.quantity);
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  type="number"
                  name="quantity"
                  label="Quantity"
                  fullWidth
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.quantity && errors.quantity}
                  error={touched.quantity && Boolean(errors.quantity)}
                />

                <Button type="submit" variant="contained" sx={{ marginTop: 1 }}>
                  Add to cart
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}