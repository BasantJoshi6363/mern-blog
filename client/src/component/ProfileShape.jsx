import React from 'react'

const ProfileShape = ({ val }) => {
  console.log(val)
  return (
    <div className='size-7 flex items-center justify-center bg-green-500 rounded-full'>{val[0]?.toUpperCase() || "anonymous"}</div>
    // <div className='size-7 flex items-center justify-center bg-green-500 rounded-full'>mula</div>
  )
}

export default ProfileShape