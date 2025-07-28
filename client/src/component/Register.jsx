import React, { memo, useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Loader from './Loader';

const Register = () => {
  const {loading,register} = useContext(AuthContext);
  const [formdata, setFormdata] = useState({
    username: "",
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
    register({ username: formdata.username, email: formdata.email, password: formdata.password })
  }

  setTimeout(() => {
    if (loading) return <Loader />
    
  }, 3000);


  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={formdata.username} name='username' onChange={handlechange} placeholder='enter your username' required />
        <input type="email" value={formdata.email} name='email' onChange={handlechange} placeholder='enter your email' required />
        <input type="password" value={formdata.password} name='password' onChange={handlechange} placeholder='enter your password' required />
        <button>Register</button>
      </form>
    </div>
  )
}

export default memo(Register);