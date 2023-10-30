import {useEffect,useState} from 'react'
import {useSelector} from "react-redux"
const CartPage = () =>{

const user = useSelector(state=>state.user)

useEffect(()=>{
    const fetchData = async () =>{
        const response = await fetch(`http://localhost:8080/api/cart/getCart/${user.id}`)
        const res = await response.json()
        console.log(res)
    }
    fetchData()
},[])
}

export default CartPage