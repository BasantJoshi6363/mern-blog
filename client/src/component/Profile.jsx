import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { PostContext } from '../context/PostContext';
import { useEffect } from 'react';
import Post from './Post';
import CreatePost from './Post/CreatePost';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { getUserPost, userPost } = useContext(PostContext);
  useEffect(() => {

    getUserPost(user.userId);
  }, [])
  console.log(userPost);
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h1 className="text-2xl font-bold my-4 mt-5">Profile</h1>
      <div className="profile-details">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p className='mb-3'><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        {/* <CreatePost /> */}
        <Link to={"/create"}>Create Post</Link>
        <hr />


        {userPost.length === 0 ? <h1 className='mt-2'>No post Available...</h1> : userPost.map((val, i) => {
          return <>

            <p className='capitalize mt-5'>your post</p>
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
                like: val.like,

              }}
            />
          </>
        })}
        { }
      </div>
    </div>
  )
}

export default Profile