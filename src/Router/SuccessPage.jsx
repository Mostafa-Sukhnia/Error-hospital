import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase.js";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser; // الحصول على المستخدم الحالي

      if (user) {
        const userRef = doc(db, "users", user.uid); // الوصول إلى مستند المستخدم
        const userSnapshot = await getDoc(userRef); // جلب المستند

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data()); // حفظ البيانات في الحالة
        } else {
          console.log("No user data found");
        }
      }
    };

    fetchUserData();

    // التحقق من الـ referrer
    const referer = document.referrer;
    if (referer.startsWith("https://buy.stripe.com/")) {
      console.log("Redirected from Stripe");
    } else {
      navigate("/"); // إذا لم يكن من Stripe، قم بإعادة توجيه المستخدم إلى الصفحة الرئيسية
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
