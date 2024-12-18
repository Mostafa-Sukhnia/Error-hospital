import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const referer = document.referrer;
    // تحقق من أن referer هو رابط Stripe
    if (!referer.startsWith("https://buy.stripe.com/")) {
      console.log(referer);
      console.log("expected you is : https://buy.stripe.com/");
      setTimeout(() => {
        navigate("/"); // إعادة التوجيه بعد تأخير إذا لم يكن من Stripe
      }, 100); // تأخير بمقدار 100 مللي ثانية للتأكد من تنفيذ التوجيه بشكل صحيح
    }
  }, [navigate]);

  return <div>SuccessPage</div>;
};

export default SuccessPage;
