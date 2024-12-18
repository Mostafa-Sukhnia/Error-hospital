import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app from '../config/firebase.js';
import { db } from '../config/firebase.js';
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth(app);
      const userRef = doc(db, "users", auth.currentUser.uid); // تأكد من أن المستخدم مسجل الدخول
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data()); // حفظ البيانات في الحالة
      } else {
        console.log("No such document!");
      }
    };

    fetchUserData();

    const referer = document.referrer;
    console.log("Referrer:", referer);
    if (referer.startsWith("https://buy.stripe.com/")) {
      console.log("Redirected from Stripe");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      SuccessPage
      {userData && (
        <div>
          <h3>User Data:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
