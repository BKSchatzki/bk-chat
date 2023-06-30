import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const LoginPage = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate('/');
    }
  })
  
  return (
    <div>
      LOGIN
    </div>
  )
}

export default LoginPage;