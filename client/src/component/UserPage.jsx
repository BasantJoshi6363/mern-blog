import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import Post from './Post';

const UserPage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState([])

  const fetchUserdataWithPost = async () => {
    try {

      const response = await axios.get(`http://localhost:5000/api/userinfowithpost/${id}`);
      setInfo(response.data.result);

    } catch (error) {
      toast.error("unable to get user with post.");
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUserdataWithPost();
  }, [])
  console.log(info)

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-black text-white min-h-screen'>
      {
        info.map((val, i) => {
          return <Post
            key={id}
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
        })
      }
    </div>
  )
}

export default UserPage