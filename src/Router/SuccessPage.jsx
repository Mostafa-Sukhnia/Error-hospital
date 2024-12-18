import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const refererr =document.referrer;
    if (refererr != "https://buy.stripe.com/") {
      navigate("/");
    }
  }, [navigate]);

  return <div>SuccessPage</div>;
};

export default SuccessPage;
