import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, CardActionArea } from "@mui/material";
import manicure from "../manicure.jpg";
import lashes from "../lashes.jpg";
import pedicure from "../pedicure.jpg";
import ButtonBase from '@mui/material/ButtonBase';


const Visitor = () => {
  const theme = useTheme(); // Get the current theme
  const AnimatedTypography = animated(Typography);
  const springProps = useSpring({
    opacity: 0.8,
    from: { opacity: 0 },
    config: { tension: 200, friction: 10 },
  });

  const [expandedManicure, setExpandedManicure] = React.useState(false);
  const [expandedLashes, setExpandedLashes] = React.useState(false);
  const [expandedPedicure, setExpandedPedicure] = React.useState(false);

  const handleExpandManicure = () => {
    setExpandedManicure(!expandedManicure);
  };
  const handleExpandLashes = () => {
    setExpandedLashes(!expandedLashes);
  };
  const handleExpandPedicure = () => {
    setExpandedPedicure(!expandedPedicure);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sx={{ marginTop: "3rem" }}>
        <AnimatedTypography
          variant="h1"
          sx={{
            color: theme.palette.primary.main,
            textAlign: "center",
            textShadow: "1px 1px 10px #061a40, 1px 1px 10px #E4E4D0",
          }}
          style={springProps}
        >
          Color Up
        </AnimatedTypography>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: "2rem" }}>
        <AnimatedTypography
          variant="h3"
          sx={{
            color: theme.palette.primary.main,
            textAlign: "center",
          }}
          style={springProps}
        >
          Here are the services offered by us:
        </AnimatedTypography>
      </Grid>
      <Grid item container justifyContent="center" spacing={4} xs={12}>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="194"
                image={manicure}
                alt="Manicure"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Manicure
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expandedManicure}
                onClick={handleExpandManicure}
                aria-expanded={expandedManicure}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expandedManicure} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Manicure</Typography>
                <Typography paragraph>
                  A manicure is a pampering beauty treatment that focuses on
                  enhancing the appearance and health of the hands and nails.
                  This indulgent procedure typically involves shaping and
                  buffing the nails, grooming the cuticles, and often includes a
                  relaxing hand massage.
                </Typography>
                <Typography paragraph>
                  With a variety of options available, from classic manicures to
                  more intricate nail art designs, individuals can personalize
                  their experience to suit their style and preferences. Whether
                  it's a simple, elegant look for professional settings or
                  vibrant, creative designs for special occasions, a manicure
                  offers an opportunity to showcase impeccable hand grooming
                  while promoting relaxation and self-care.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="194"
                image={lashes}
                alt="Lashes"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lashes
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expandedLashes}
                onClick={handleExpandLashes}
                aria-expanded={expandedLashes}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expandedLashes} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Lashes</Typography>
                <Typography paragraph>
                  A manicure is a pampering beauty treatment that focuses on
                  enhancing the appearance and health of the hands and nails.
                  This indulgent procedure typically involves shaping and
                  buffing the nails, grooming the cuticles, and often includes a
                  relaxing hand massage.
                </Typography>
                <Typography paragraph>
                  With a variety of options available, from classic manicures to
                  more intricate nail art designs, individuals can personalize
                  their experience to suit their style and preferences. Whether
                  it's a simple, elegant look for professional settings or
                  vibrant, creative designs for special occasions, a manicure
                  offers an opportunity to showcase impeccable hand grooming
                  while promoting relaxation and self-care.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="194"
                image={pedicure}
                alt="Pedicure"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Pedicure
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expandedPedicure}
                onClick={handleExpandPedicure}
                aria-expanded={expandedPedicure}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expandedPedicure} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Pedicure</Typography>
                <Typography paragraph>
                  A manicure is a pampering beauty treatment that focuses on
                  enhancing the appearance and health of the hands and nails.
                  This indulgent procedure typically involves shaping and
                  buffing the nails, grooming the cuticles, and often includes a
                  relaxing hand massage.
                </Typography>
                <Typography paragraph>
                  With a variety of options available, from classic manicures to
                  more intricate nail art designs, individuals can personalize
                  their experience to suit their style and preferences. Whether
                  it's a simple, elegant look for professional settings or
                  vibrant, creative designs for special occasions, a manicure
                  offers an opportunity to showcase impeccable hand grooming
                  while promoting relaxation and self-care.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: "2rem" }}>
        <AnimatedTypography
          variant="h3"
          sx={{
            color: theme.palette.primary.main,
            textAlign: "center",
          }}
          style={springProps}
        >
          Here are our top providers:
        </AnimatedTypography>
      </Grid>
      <Grid item container justifyContent="center" spacing={4} xs={12}>
        
      </Grid>
    </Grid>
  );
};

export default Visitor;
