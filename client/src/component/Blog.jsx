import React, { memo, useContext, useEffect, useState } from 'react';
import { PostContext } from '../context/PostContext';
import Post from './Post';

const Blog = () => {
  const { post } = useContext(PostContext);
  const categories = ["Technology", "Health", "Food", "Travel", "LifeStyle", "Business", "Entertainment"];
  const [filteredPost, setFilterPost] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setFilterPost(post);
  }, [post]);

  const filterPosts = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilterPost(post);
    } else {
      const result = post.filter((p) => p.category === category);
      setFilterPost(result);
    }
  };

  return (
    <div className="`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-black text-white min-h-screen`">
      <div className="flex justify-center flex-wrap gap-2 mb-6">
        {/* Add "All" category at the beginning */}
        {["All", ...categories].map((category, i) => (
          <button
            key={i}
            onClick={() => filterPosts(category)}
            className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPost.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl text-gray-400">
            No posts available for <strong>{selectedCategory}</strong> category 😕
          </h2>
        </div>
      ) : (
        <div className="">
          {filteredPost.map((val) => (
            <Post
              key={val._id}
              val={{
                title: val.title,
                id: val._id,
                body: val.body,
                image: val.imageUrl,
                create: val.createdAt,
                category: val.category,
                user: {
                  username: val.user.username,
                },
                userid: val.user._id,
                comment: val.comment,
                like: val.like
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Blog);
