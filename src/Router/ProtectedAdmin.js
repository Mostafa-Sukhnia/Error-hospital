import app from "../config/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";

const ProtectedAdmin = ({ children }) => {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true); // لإدارة حالة تحميل الدور
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const res = doc(db, "users", user.uid);
          const userRes = await getDoc(res);
          if (userRes.exists()) {
            const userData = userRes.data();
            setRole(userData.role);
          } else {
            console.error("No user document found!");
            navigate("/");
          }
        } catch (err) {
          console.error("Error fetching user role:", err);
          navigate("/");
        } finally {
          setRoleLoading(false);
        }
      } else {
        setRoleLoading(false);
        navigate("/");
      }
    };
  
    if (!loading) { // تأكد من أن حالة التحميل من useAuthState انتهت
      fetchUserRole();
    }
  }, [user, loading, navigate]);
  

  // عرض شاشة التحميل أثناء انتظار بيانات المستخدم أو الدور
  if (loading || roleLoading) {
    return (
      <div className="w-[100%] h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-[5px] border-t-gray-300 border-x-gray-300 border-b-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // عرض خطأ إذا حدث أثناء جلب بيانات المستخدم
  if (error) {
    console.error("Error occurred:", error.message);
    navigate("/"); // إعادة التوجيه إلى الصفحة الرئيسية
    return null;
  }

  // السماح بالوصول إذا كان الدور "admin"
  if (role !== "") {
    if (role === "admin") {
      return children;
    }
  }

  // إعادة التوجيه إلى الصفحة الرئيسية إذا لم يكن الدور "admin"
  return <Navigate to="/" replace />;
};

export default ProtectedAdmin;
