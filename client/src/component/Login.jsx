import React, { memo, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Loader from './Loader';

const Login = () => {
  const { loading, login } = useContext(AuthContext);
  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  })

  const handlechange = (e) => {
    e.preventDefault();

    setFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value

      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: formdata.email, password: formdata.password })
  }
  

  // if (loading) return <Loader />

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

      <form action="" onSubmit={handleSubmit}>
        <input type="email" value={formdata.email} name='email' onChange={handlechange} placeholder='enter your email' required />
        <input type="password" value={formdata.password} name='password' onChange={handlechange} placeholder='enter your password' required />
        <button>Login</button>
      </form>
    </div>
  )
}

export default memo(Login);