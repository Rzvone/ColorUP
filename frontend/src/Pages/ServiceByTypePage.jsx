import {useEffect,useState} from "react"
import { useParams } from "react-router-dom"
import Services from "./Services"
const ServiceByTypePage = () =>{
const [loading,setLoading] = useState(true)
const [services,setServices] = useState([])
const {service} = useParams()
useEffect(()=>{
const fetchServices = async() =>{
const response = await fetch(`http://localhost:8080/api/services/getServices/${service}`)
const res = await response.json()
setServices(res)
setLoading(false)
}
fetchServices()
},[])
return<>
{loading?<h1>loading..</h1>:<Services services={services}/>}
</>
}

export default ServiceByTypePage;