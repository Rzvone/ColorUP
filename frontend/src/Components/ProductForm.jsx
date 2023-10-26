import { Formik } from "formik";
import * as yup from "yup";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";

const ProductForm = () => {
  const token = useSelector((state) => state.token);

  const submitForm = async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", "nails");
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("image", values.image);
      console.log(values)
      formData.forEach((value, key) => {
        console.log(key, value);
      });
    try {
      const response = await fetch("http://localhost:8080/api/admin/createProduct", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData, // Send the FormData object with the image file
      });
  
      if (response.ok) {
        // Handle a successful response here
        console.log("Product created successfully");
      } else {
        // Handle errors or failed response
        console.error("Product creation failed");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("An error occurred:", error);
    }
  };
  

  const initialValues = {
    name: "",
    description: "",
    price: 0,
    stock:0,
    image: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Product name is required!"),
    description: yup.string().required("Product description is required!"),
    price: yup.number().required("Price is required").positive("Price must be positive"),
    stock:yup.number().required("Stock is required").positive("Stock must be positive"),
    image: yup
      .mixed()
      .required("Image is required")
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

  return (
    <Box sx={{ margin: "4rem" }}>
      <Formik
        onSubmit={submitForm}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange, // Use handleChange for input changes
          handleBlur, // Use handleBlur for onBlur event
          handleSubmit,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  variant="outlined"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product description"
                  variant="outlined"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  error={Boolean(touched.description) && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product price"
                  variant="outlined"
                  type="number"
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  error={Boolean(touched.price) && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product stock"
                  variant="outlined"
                  type="number"
                  name="stock"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.stock}
                  error={Boolean(touched.stock) && Boolean(errors.stock)}
                  helperText={touched.stock && errors.stock}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onBlur={handleBlur}
                  onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                />
                <label htmlFor="image">Choose an image</label>
                {touched.image && errors.image && <div className="error">{errors.image}</div>}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ProductForm;
