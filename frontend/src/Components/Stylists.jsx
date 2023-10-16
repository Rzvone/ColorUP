import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, CardMedia, Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    "&:hover $mask": {
      display: "flex",
    },
  },
  mask: {
    display: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    flexDirection: "column",
  },
  image: {
    height: "500px", // Set the fixed height you desire
    objectFit: "cover", // Maintain the image's aspect ratio while fitting it
  },
}));

const Stylists = () => {
  const classes = useStyles();
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    const fetchStylists = async () => {
      const response = await fetch("http://localhost:8080/api/providers/getProviders");
      const res = await response.json();
      console.log(res);
      setStylists(res);
    };
    fetchStylists();
  }, []);

  return (
    <Box sx={{ margin: "3rem" }}>
      <Grid container spacing={1}>
        {stylists.map((stylist, key) => (
          <Grid item xs={12} md={4} key={key}>
            <Card className={classes.card} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                image={stylist.image}
                alt={`${stylist.provider.firstName} ${stylist.provider.lastName}`}
                className={classes.image}
              />
                <div className={classes.mask}>
                  <Typography variant="h5" component="div">
                    {stylist.provider.firstName} {stylist.provider.lastName}
                  </Typography>
                  <Typography>
                    {stylist.provider.servicesProvided.map((service) => service.serviceType).join(", ")}
                  </Typography>
                </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Stylists;
