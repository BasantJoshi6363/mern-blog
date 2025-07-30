import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import Loader from './Loader';
import ProfileShape from './ProfileShape';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Button from './Button';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const { createComment } = useContext(PostContext);
    const { isAuthenticated } = useContext(AuthContext);
    console.log(post)


    const fetchSinglePost = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/post/${id}`);

            setPost(response.data.result);
            if (!response.data.success) {
                toast.error("Post not found");
            }
        }
        catch (error) {
            console.error("Error fetching post:", error);
            toast.error("Failed to fetch post");
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }
    const submitHandler = async (e) => {
        console.log("hello hii kaise ho sathi")
        e.preventDefault();
        if (!comment) {
            toast.error("Comment cannot be empty");

        }
        if (!isAuthenticated) {
            toast.error("You must be logged in to comment");
            return <Navigate to={"/login"} />;
        }
        createComment(post._id, comment);
        setComment("");
    }

    useEffect(() => {
        fetchSinglePost();

    }, [1])
    console.log(post)
    if (loading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="top flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <ProfileShape val={post.user.username} />
                    <p>{post.user.username}⭐</p>
                </div>
                <div className="social flex gap-3 text-[15px]">
                    <Link>
                        <FaInstagram className='cursor-pointer hover:opacity-85' />

                    </Link>
                    <Link>
                        <FaFacebook className='cursor-pointer hover:opacity-85' />

                    </Link>
                    <Link>

                        <FaTwitter className='cursor-pointer hover:opacity-85' />
                    </Link>
                    <Link>
                        <FaLinkedin className='cursor-pointer hover:opacity-85' />
                    </Link>
                    <Link>
                        <FaWhatsapp className='cursor-pointer hover:opacity-85' />
                    </Link>
                </div>
            </div>
            <div className="float-right text-2xl">
                <PiDotsThreeVerticalBold className='cursor-pointer hover:opacity-85' />
            </div>
            <div className="lower">
                <h1 className='mt-10 text-4xl'>{post.title}</h1>
                <p className='uppercase opacity-60 mt-2'>Published  {moment(post.createdAt).format('YYYY MMM DD HH.mm')}</p>
                <div className="h-[500px] w-full mt-5">
                    <img src={post.imageUrl} className='size-full object-cover' alt="" />
                </div>

                <p className='mt-5'>{post.body}</p>

                <form onSubmit={submitHandler} className='flex items-center gap-5 mt-5'>
                    <input className='w-1/3 px-3 py-3 border-none outline-none bg-zinc-700' type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder='write your comment: ' />
                    <Button val={"Send Comment"} />
                </form>

                {post.comment.length === 0 ? (
                    <div>
                        <h6>No Comment Available.</h6>
                    </div>
                ) : (
                    <div className="mt-10">
                        {post.comment.map((com) => (
                            <div key={com._id} className="">
                                <div className="flex gap-2 items-center">
                                    <div className="">
                                        <Link to={`/user/${com.user._id}`}>
                                            <ProfileShape val={com.user.username} />
                                        </Link>
                                    </div>
                                    <div className="w-[369px] bg-zinc-700  p-2  rounded-md">
                                        <p className='text-[11px] opacity-70'>{com.user.username}</p>
                                        <p className='text-[15px]'>{com.content}</p>
                                    </div>
                                </div>
                                <p className='text-[11px] opacity-70 ml-12 mt-2'>{moment(com.createdAt).from()}</p>

                                <br />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SinglePost;
