import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CreatePost from "./Post/CreatePost";
import PostCard from "./Post/PostCard";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000");
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <div>
      
   <CreatePost />
      <h3>Our Feed</h3>
      {posts.map((val) => (
        <PostCard
          key={val._id}
          val={{
            title: val.title,
            content: val.content,
            category : val.category,
            image: val.imageUrl,
            author : val.user.username,
            id : val._id
          }}
        />
      ))} 
    </div>
  );
};

export default Home;