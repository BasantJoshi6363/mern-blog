import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import CreatePost from '../component/CreatePost';
import women from "../assets/women.png"
import circle2 from "../assets/circle2.png";
import { Link } from 'react-router-dom';
import Home1 from '../component/Home1';
import Loader from '../component/Loader';
const Home = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const items = [
    { title: "Technology", imageUrl: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg", category: "technology" },
    { title: "Health", imageUrl: "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg", category: "health" },
    { title: "Sports", imageUrl: "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg", category: "sports" }
  ]
  // if (loading) return <Loader />
  return (
    <div className="">
      {isAuthenticated ? (
        <div className="size-full relative z-10">
          <img src={circle2} alt="" />
          <div className='absolute z-10 top-10 left-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className="flex items-center justify-between w-full mt-10 gap-10">
              <div className="info">
                <h1 className='text-8xl capitalize text-left'>find your <br /> <span className='text-blue-800'>best article</span> <br />Here</h1>
                <Link to={"/register"}>
                </Link>
              </div>
              <div className="circles flex gap-5 mt-5 ">
                {items.map((val, i) => {
                  return <Link key={i} to={`blog`} className=' h-[300px] w-[200px] flex flex-col gap-5'>
                    <div className="capsule size-[90%] flex items-center justify-center object-cover ">
                      <img src={val.imageUrl} className='size-full object-cover rounded-full' alt="" />
                    </div>
                    <p className='text-center'>{val.title}</p>
                  </Link >
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (<Home1 />)}


    </div>
  )
}

export default Home