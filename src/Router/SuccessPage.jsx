import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {db} from '../config/firebase';
import app from '../config/firebase.js';
import {doc,getDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const referer = document.referrer;
    console.log("Referrer:", referer);
    if (referer.startsWith("https://buy.stripe.com/")) {
      console.log("Redirected from Stripe");
      if(auth){
        const userRef = getDoc(doc(db,'users',auth.currentUser.uid));
        const user = userRef.data();
        console.log(user);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div>SuccessPage</div>;
};

export default SuccessPage;
