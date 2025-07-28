import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import CreatePost from '../component/CreatePost';
import women from "../assets/women.png"
import circle1 from "../assets/Circles.png";
import { Link } from 'react-router-dom';
const Home1 = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  return (
    <div className="size-full relative">
      <img src={circle1} alt="" />
      <div className='absolute top-10 left-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="flex items-center justify-center w-full mt-10 gap-3">
          <img src={women}  className='h-[330px] w-[499px]' alt="" />
          <div className="info">
            <h1 className='text-8xl capitalize text-right'>Write your <br /> <span className='text-blue-800'>Article</span> <br />Here</h1>
            <Link to={"/register"}>
            <button className='float-right mt-5 bg-blue-800 rounded-full px-5 py-3 cursor-pointer hover:opacity-55'>Create Account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home1