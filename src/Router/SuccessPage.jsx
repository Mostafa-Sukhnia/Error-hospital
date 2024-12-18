import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {

const navigate = useNavigate();
useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get("payment_status");
    if(paymentStatus !== 'success'){
        navigate('/')
    }
},[navigate])

  return (
    <div>SuccessPage</div>
  )
}

export default SuccessPage