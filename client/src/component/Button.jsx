import React from 'react'

const Button = ({val}) => {
  return (
    <button className='bg-blue-700 px-5 flex py-2 rounded-full hover:opacity-65 cursor-pointer'>{val}</button>
  )
}

export default Button