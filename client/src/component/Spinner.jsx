import React from 'react'
import spin from "../assets/spin.gif"
const Spinner = () => {
  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
        {/* <h1 className='text-2xl'>please wait....</h1> */}
        <img src={spin} alt="" />
    </div>
  )
}

export default Spinner