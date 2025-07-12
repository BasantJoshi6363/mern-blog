import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
  const navigate = useNavigate();
  const isAuth = useContext(AuthContext);
  if(isAuth===null){
    return <div>loading...</div>
  }
  if(!isAuth){
     navigate("/login");
  }
  navigate("/")
  return children;
}

export default PublicRoute