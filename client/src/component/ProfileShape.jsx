import React from 'react'

const ProfileShape = ({val}) => {
   
  return (
    <div className='size-7 flex items-center justify-center bg-zinc-500 rounded-full'>{val[0].toUpperCase()}</div>
  )
}

export default ProfileShape