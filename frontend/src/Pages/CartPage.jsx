import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { setLogin } from "../state";

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [cart, setCart] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/cart/getCart/${user.id}`
      );
      const res = await response.json();
      console.log(res);
      setCart(res);
    };
    fetchData();
  }, [user]);
  console.log(cart);

  const changeQuantity = async (productId, flag) => {
    const response = await fetch(
      `http://localhost:8080/api/cart/update/${user.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          productId: productId,
          addOrRemove: flag,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    console.log(res);
    dispatch(
      setLogin({ user: { ...user, cart: res.user.cart }, token: token })
    );
    // Assuming the response is the updated cart, update the cart state with the response data
  };
  let total = 0;

  return (
    <>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  sx={{ marginTop: "2rem", color: theme.palette.primary.main }}
                >
                  Shopping Cart
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "1rem" }}>
                <Card>
                  {cart.map((product, key) => (
                    <div key={key}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          margin: "1rem",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.product.name}
                            style={{
                              maxWidth: "50px",
                              maxHeight: "50px",
                              objectFit: "contain",
                            }}
                          />
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.palette.primary.main,
                              marginLeft: ".5rem",
                              maxWidth: "10rem",
                            }}
                          >
                            {product.product.name}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            sx={{ marginLeft: ".5rem", color: "red" }}
                            onClick={() =>
                              changeQuantity(product.product.id, false)
                            }
                          >
                            <RemoveIcon />
                          </Button>
                          <TextField
                            id="outlined-number"
                            label="Quantity"
                            type="number"
                            value={product.quantity}
                            InputProps={{
                              readOnly: true,
                            }}
                            sx={{ marginLeft: ".5rem", maxWidth: "4.5rem" }}
                          />
                          <Button
                            sx={{
                              marginLeft: ".5rem",
                              color: "green",
                              marginRight: "1.5rem",
                            }}
                            onClick={() =>
                              changeQuantity(product.product.id, true)
                            }
                          >
                            <AddIcon />
                          </Button>
                          <Typography sx={{ marginRight: "1.5rem" }}>
                            Cost: {product.product.price * product.quantity} $
                          </Typography>
                        </Box>
                      </Box>
                      {key !== cart.length - 1 && (
                        <Divider sx={{ width: "100%" }} />
                      )}
                    </div>
                  ))}
                  <Box sx={{ textAlign: "center", margin: "1rem" }}>
                    <Typography variant="h5">
                      Total cost:{" "}
                      {cart.reduce(
                        (acc, curr) =>
                          (acc += curr.product.price * curr.quantity),
                        0
                      )}{" "}
                      $
                    </Typography>
                  </Box>
                <Box sx={{ textAlign: "center", margin: "1rem" }}>
                  <Button variant="outlined">Proceed to Checkout</Button>
                </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={5}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CartPage;
