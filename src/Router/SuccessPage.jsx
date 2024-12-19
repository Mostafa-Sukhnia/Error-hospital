import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import app from "../config/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const referer = document.referrer;

    console.log("Referrer:", referer);

    if (referer.startsWith("https://buy.stripe.com/")) {
      console.log("Redirected from Stripe");

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userRef = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              console.log("User data:", userData);
            } else {
              console.error("No user data found!");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          console.error("No user is logged in.");
          navigate("/");
        }
      });

      // تنظيف الاستماع عند الخروج
      return () => unsubscribe();
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div>SuccessPage</div>;
};

export default SuccessPage;
