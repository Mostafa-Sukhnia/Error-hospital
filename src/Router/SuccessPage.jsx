import React,{ useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const { status } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== 'success') {
      navigate('/');
    }
  }, [status, navigate]);

  return <div>SuccessPage</div>;
};

export default SuccessPage;
