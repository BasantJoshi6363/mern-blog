import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ val }) => {
  return (
    <Link to={val.id}>
    <div className="bg-black text-white py-6 px-4 border-b border-gray-800">
      <img
        src={val.image}
        alt="Post"
        className="w-full h-40 object-cover mb-4 rounded-md"
      />
      <h2 className="text-xl font-bold mb-1">{val.title}</h2>
      <p className="text-gray-400 text-sm mb-2">{val.description}</p>

      <div className="text-xs text-gray-500 flex flex-wrap gap-4">
        <span>📅 {val.date || "July 2023"}</span>
        <span>🏷️ {val.category}</span>
        <span>✍️ {val.author}</span>
      </div>
    </div>
    </Link>
  );
};

export default PostCard;