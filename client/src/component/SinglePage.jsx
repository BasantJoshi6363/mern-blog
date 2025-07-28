import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import Loader from './Loader';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

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
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchSinglePost();

    }, [1])
    if (loading) {
        return <Loader/>
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10">
            <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded shadow">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <img src={post.imageUrl} alt={post.title} className="w-full h-80 object-cover rounded mb-4" />
                <p className="mb-2 text-sm text-gray-300">Posted {moment(post.createdAt).fromNow()}</p>
                <p className="mb-4 text-gray-100">{post.body}</p>
                <div className="text-gray-400 italic">Category: {post.category}</div>
                <div className="text-gray-400 mt-2">Posted by: {post.user.username}</div>
            </div>
        </div>
    );
};

export default SinglePost;
