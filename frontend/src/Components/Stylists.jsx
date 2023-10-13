import { Box, Grid, Card, CardContent, CardMedia, CardActions, Button, Typography } from "@mui/material"
import { useEffect,useState } from "react"
const Stylists = () =>{
const [stylists, setStylists] = useState([])    
useEffect(()=>{
    const fetchStylists = async () =>{
        const response = await fetch("http://localhost:8080/api/providers/getProviders")
        const res = await response.json()
        setStylists(res)
    }
    fetchStylists()
})
return<Box sx={{margin:'3rem'}}>
<Grid container spacing={2}>
{stylists.map((stylist,key)=>(
    <Grid item xs={12}>
<Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {stylist.firstName} {stylist.lastName}
        </Typography>
            <Typography>
                {stylist.servicesProvided.map(service=>service.serviceType).join(",")}
            </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Make an appointment</Button>
      </CardActions>
    </Card>
    </Grid>
))}
</Grid>
</Box>
}

export default Stylists