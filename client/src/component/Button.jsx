import React from 'react'

const Button = ({val}) => {
  return (
    <div className='bg-blue-700 px-5 flex py-2 rounded-full hover:opacity-65'>{val}</div>
  )
}

export default Button