import {useSelector} from 'react-redux'
import {Box,Grid,Card,CardContent, Typography, CardActions, Button} from '@mui/material'
const AppointmentsPage = () =>{
const user = useSelector(state=>state.user)    
return <Box sx={{marginTop:10, marginLeft:5,marginRight:5}}>
    <Grid container spacing={1}>
        {user.appointments.map((appointment,i)=>(
            <Grid item xs={12}>
           <Card sx={{ minWidth: 275 }} key={i}>
           <CardContent>
             <Typography variant="body2">
              {appointment.startDate}
             </Typography>
           </CardContent>
           <CardActions>
             <Button size="small">Learn More</Button>
           </CardActions>
         </Card>
         </Grid>
        ))}
    </Grid>
</Box>
}

export default AppointmentsPage