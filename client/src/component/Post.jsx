import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Post = ({ val }) => {
  return (
    <Link to={`/${val.id}`} className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Image */}
      <img
        src={val.image}
        alt={val.title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{val.title}</h2>

        {/* Body */}
        <p className="text-gray-300 flex-grow mb-4 line-clamp-3">{val.body}</p>

        {/* Category */}
        <p className="text-gray-400 lowercase mb-2">{val.category||'Uncategorized'}</p>

        {/* Footer with time and user */}
        <div className="flex justify-between text-gray-500 text-sm mt-auto">
          <span>{moment(val.create).fromNow()}</span>
          <span>By {val.user.username}</span>
        </div>
      </div>
    </Link>
  );
};

export default Post;
