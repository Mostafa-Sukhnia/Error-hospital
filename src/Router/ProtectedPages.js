import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../config/firebase";
import { getAuth } from "firebase/auth";

const ProtectedPages = ({ children }) => {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="w-[100%] h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-[5px] border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signup" replace />;
  }else{
    return children;
  }

};

export default ProtectedPages;
