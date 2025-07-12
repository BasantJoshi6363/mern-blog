import React from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className='size-full p-4'>
        <div className="upper flex items-center h-10 justify-center">
            <h3 className='text-center text-[11px] '>Subscribe to our Newsletter For New & latest Blogs and Resources</h3>
        </div>
        <div className="size-full lower flex justify-between items-center bg-zinc-900 border border-zinc-900 p-[100px]">
            <div className="left">
                BasantTech
            </div>
            <div className="middle ">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>Home</Link>
                <Link to={"/news"}>Home</Link>
            </div>
            <div className="left">
                <Link to={"/contact"}>Contact</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar