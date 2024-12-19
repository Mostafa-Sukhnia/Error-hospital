import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {db} from '../config/firebase';
import app from '../config/firebase.js';
import {doc,getDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
import { aside } from "motion/react-client";
const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const referer = document.referrer;
    console.log("Referrer:", referer);
    if (referer.startsWith("https://buy.stripe.com/")) {
      console.log("Redirected from Stripe");
      if(auth){
const getData =async ()=>{
   const userRef =await getDoc(doc(db,'users',auth.currentUser.uid));
   return userRef
}
        const user = getData().data();
        console.log(user);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div>SuccessPage</div>;
};

export default SuccessPage;
