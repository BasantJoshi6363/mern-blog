import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ProfileShape from './ProfileShape';
import Button from './Button';
import { CiHeart } from "react-icons/ci";
import { VscComment } from "react-icons/vsc";

const Post = ({ val }) => {
  return (
    <div to={`/${val.id}`} className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden flex mt-5">
      {/* Image */}
      <img
        src={val.image}
        alt={val.title}
        className="w-1/5 h-48 object-cover"
      />

      {/* Content */}
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
        <div className="">
          <h2 className="text-xl font-semibold mb-2">{val.title}</h2>
        <p className="text-gray-300 truncate flex-grow mb-4 line-clamp-3">{val.body}</p>
        </div>
        <div className="flex justify-between text-gray-500 text-sm ">
          <span>{moment(val.create).fromNow()}</span>

        </div>
        </div>
        
        <div className="profile flex gap-3 items-center">
          <ProfileShape val={val.user.username} />
          <p className=' opacity-65 text-[10px]'>{val.user.username}⭐</p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <button className='bg-green-700 py-1 px-5 rounded-full text-[12px] mt-5 opacity-80 '>{val.category || "Anonymous"}</button>
          <div className="flex gap-5 items-center">
            <ul className='flex gap-3 items-center mt-3'>
              <li className='flex gap-1 items-center'>
                <CiHeart size={25} />
                <p>
                  {val.like.length}
                </p>
              </li>
              <li className='flex gap-1 items-center'>
                <VscComment size={20} />
                <p>{val.comment.length}</p>
              </li>
            </ul>
            <Link to={`/${val.id}`}><Button val={"Read More"} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
