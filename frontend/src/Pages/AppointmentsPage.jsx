import {useSelector} from 'react-redux'
import dayjs from "dayjs"
import {useEffect, useState} from "react"
import {Box,Grid,Card,CardContent, Typography, CardActions, Button} from '@mui/material'
const AppointmentsPage = () =>{
const user = useSelector(state=>state.user)
useEffect(()=>{
  const fetchProviders = async() =>{
    const uniqueProviderIds = new Set(user.appointments.map(appointment => appointment.provider));
    const params = [...uniqueProviderIds].map(providerId => `providerIds=${providerId}`).join("&");
    const response = await fetch(`http://localhost:8080/api/providers/getProvidersPerAppointment?${params}`)
    const res = await response.json()
    console.log(res)
  }
  fetchProviders()
},[user.appointments])    
return <Box sx={{marginTop:10, marginLeft:5,marginRight:5}}>
    <Grid container spacing={2}>
        {user.appointments.map((appointment,i)=>(
            <Grid item xs={12}>
           <Card sx={{ minWidth: 275 }} key={i}>
           <CardContent>
             <Typography variant="h5">
              {dayjs(appointment.startDate).format("YYYY-MM-DD HH:mm")} - {dayjs(appointment.endDate).format("HH:mm")}
             </Typography>
             <Typography variant = "body2" sx={{marginTop:1}} >
              {appointment.status}
             </Typography>
             <Typography variant = "body2" sx={{marginTop:1}}>
              {appointment.services.map(service=>service.serviceType).join(",")}
             </Typography>
             <Typography variant = "body2" sx={{marginTop:1}}>
              {appointment.services.reduce((acc,cur)=>acc+=cur.price,0)} $
             </Typography>
           </CardContent>
           <CardActions>
             <Button size="small">Cancel</Button>
           </CardActions>
         </Card>
         </Grid>
        ))}
    </Grid>
</Box>
}

export default AppointmentsPage