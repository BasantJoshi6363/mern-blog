import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);  
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h1 className="text-2xl font-bold my-4 mt-5">Profile</h1>
      <div className="profile-details">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
    </div>
  )
}

export default Profile