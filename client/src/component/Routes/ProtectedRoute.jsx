import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {
  const {isAuth} = useContext(AuthContext);
  
 
  if(!isAuth){
  <Navigate to={"/login"}/>
  }
 
  return children;
  
}

export default ProtectedRoute