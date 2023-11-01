import { Box, Card, CardContent, Typography, Avatar } from "@mui/material"
import {useEffect, useState} from "react"
import { useSpring, animated } from 'react-spring';

const Services = () =>{

const [services,setServices] = useState([])
const [loading,setLoading] = useState(true)

const cardAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

useEffect(()=>{
    const fetchData = async () =>{
        const response = await fetch("http://localhost:8080/api/services/getServices")
        const res = await response.json()
        console.log(res)
        setServices(res)
        setLoading(false)
    }
    fetchData()
},[])

return (
  <Box sx={{ margin: 5 }}>
  {services.map((service, i) => (
    <animated.div style={cardAnimation} key={i}>
      <Card sx={{ width: '100%', minHeight: 230, marginTop: 5 }}>
        <CardContent>
          <Avatar
            alt={`${service.firstName} ${service.lastName}`}
            src={service.providerImage}
            sx={{ width: 60, height: 60, marginRight: 2 }}
          />
          <Typography variant="h6">
            {service.serviceType}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`${service.firstName} ${service.lastName}`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Duration: {service.duration} minutes
          </Typography>
          <Typography variant="h6" color="primary">
            Price: ${service.price}
          </Typography>
        </CardContent>
      </Card>
    </animated.div>
  ))}
</Box>
  );
  
}

export default Services