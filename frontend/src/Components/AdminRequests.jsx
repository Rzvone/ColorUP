import { useEffect, useState } from "react"
import {useSelector} from "react-redux"
const AdminRequests = () =>{
    const token = useSelector(state=>state.token)
    useEffect(()=>{
        const fetchUsers = async () =>{
            const response = await fetch("http://localhost:8080/api/admin/getPendingProviders",{
                method:'GET',
                headers:{
                    "Content-type":"application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const res = await response.json()
            console.log(res)
        }
        fetchUsers()
    },[])
return <h1>Admin</h1>
}

export default AdminRequests