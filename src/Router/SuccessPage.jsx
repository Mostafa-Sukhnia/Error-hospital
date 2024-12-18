import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

//   useEffect(() => {
//     const referer = document.referrer;
//     console.log('Referrer:', referer);  
//     if (referer.startsWith('https://buy.stripe.com/')) {
//       console.log('Redirected from Stripe');
//     } else {
//       navigate('/'); 
//     }
//   }, [navigate]);
  

  return <div>SuccessPage</div>;
};

export default SuccessPage;
