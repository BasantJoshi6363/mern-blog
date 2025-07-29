import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import Loader from './Loader';
import ProfileShape from './ProfileShape';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Button from './Button';
import { PostContext } from '../context/PostContext';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const { createComment } = useContext(PostContext);


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
            return;
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

                <h1 className='mt-5'>{post.title}</h1>
                <p className='uppercase opacity-60'>Published  {moment(post.createdAt).format('YYYY MMM DD HH.mm')}</p>
                <div className="h-[500px] w-full mt-3">
                    <img src={post.imageUrl} className='size-full object-cover' alt="" />
                </div>

                <p className='mt-5'>{post.body}</p>

                <form onSubmit={submitHandler} className='flex items-center gap-5 mt-5'>
                    <input className='w-1/3 px-2 py-2 border-none outline-none bg-zinc-700' type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder='write your comment: ' />
                    <Button val={"Send Comment"} />
                </form>
                <h3 className='lowercase opacity-75'>Comments</h3>

                {post.comment.map((val, i) => {
                    return <div>
                       {console.log(val)}
                    </div>
                })}

            </div>
            {/* <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded shadow">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <img src={post.imageUrl} alt={post.title} className="w-full h-80 object-cover rounded mb-4" />
                <p className="mb-2 text-sm text-gray-300">Posted {moment(post.createdAt).fromNow()}</p>
                <p className="mb-4 text-gray-100">{post.body}</p>
                <div className="text-gray-400 italic">Category: {post.category}</div>
                <div className="text-gray-400 mt-2">Posted by: {post.user.username}</div>
            </div> */}
        </div>
    );
};

export default SinglePost;
