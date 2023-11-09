import {useEffect, useState} from "react"
import Services from "./Services"
const ServicesPage = () =>{
    const [services,setServices] = useState([])    
    const [loading,setLoading] = useState(true)
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

    return <>
    {loading?<h1>loading..</h1>:<Services services={services}/>}
    </>
}

export default ServicesPage