import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, CardMedia, Typography, Rating, useTheme} from "@mui/material";
import {Link} from "react-router-dom"
import { makeStyles } from "@mui/styles";
import SimpleFooter from "./SimpleFooter";

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
  const theme = useTheme();
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
      <Typography variant="h3" sx={{color: theme.palette.primary.main,textAlign:'center'}}>Our experienced stylists</Typography>
      <Box sx={{margin:2}}>
      <Typography sx={{textAlign:'center'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
      </Box>
      <Grid container spacing={1}>
        {stylists.map((stylist, key) => (
          <Grid item xs={12} sm={4} key={key}>
            <Link to={'/stylists/'+stylist.provider.id}>
            <Card className={classes.card} sx={{ maxWidth: 460 }}>
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
                  <Rating readOnly></Rating>
                </div>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Stylists;
