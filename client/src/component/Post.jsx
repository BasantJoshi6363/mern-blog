import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ProfileShape from './ProfileShape';
import Button from './Button';
import { CiHeart } from "react-icons/ci";
import { VscComment } from "react-icons/vsc";

const Post = ({ val }) => {
  const trimmedBody = val.body
    ? val.body.split(" ").slice(0, 30).join(" ") + (val.body.split(" ").length > 30 ? "..." : "")
    : "";

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden flex mt-5">
      {/* Image */}
      <img
        src={val.image}
        alt={val.title}
        className="w-1/5 h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow w-full">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold mb-1">{val.title}</h2>
            <h6 className='text-gray-300 text-sm mb-2 w-full'>
              {trimmedBody}
            </h6>
          </div>
          <div className="text-gray-400 text-xs text-right ml-2">
            <span className='flex w-[100px]'>
              {moment(val.create).fromNow()}
            </span>
          </div>
        </div>

        {/* User Profile */}
        <div className="profile flex gap-3 items-center mt-2">
          <ProfileShape val={val.user.username} />
          <p className='opacity-65 text-[10px]'>{val.user.username} ⭐</p>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-3">
          <button className='bg-green-700 py-1 px-5 rounded-full text-[12px] mt-2 opacity-80'>
            {val.category || "Anonymous"}
          </button>

          <div className="flex gap-5 items-center">
            <ul className='flex gap-3 items-center mt-3'>
              <Link className='flex gap-1 items-center'>
                <CiHeart size={25} />
                <p>{val.like?.length || 1}</p>
              </Link>
              <Link to={`/${val.id}`} className='flex gap-1 items-center'>
                <VscComment size={20} />
                <p>{val.comment?.length || 0}</p>
              </Link>
            </ul>
            <Link to={`/${val.id}`}>
              <Button val={"Read More"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
