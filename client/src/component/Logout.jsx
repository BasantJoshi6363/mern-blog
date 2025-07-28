import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'

const Logout = () => {
    const {logout} = useContext(AuthContext);
    logout();
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>Logout</div>
  )
}

export default Logout