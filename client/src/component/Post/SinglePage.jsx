import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming React Router is used
import axios from "axios";

const SinglePostPage = () => {
    const { id } = useParams(); // Gets the post ID from the route
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/${id}`);
                console.log(res.data)
                setPost(res.data.result);
            } catch (err) {
                console.error("Failed to fetch post:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p className="text-center text-gray-400 mt-10">Loading post...</p>;
    if (!post) return <p className="text-center text-red-400 mt-10">Post not found.</p>;

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10 font-sans">
            <img
                src={post.imageUrl}
                alt="Post"
                className="w-full max-h-96 object-cover rounded-md mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-400 text-sm mb-6">{post.content}</p>

            <div className="text-xs text-gray-500 space-x-6">
                <span>📅 {post.date || "Unknown Date"}</span>
                <span>🏷️ {post.category}</span>
                <span>✍️ {post.author}</span>
            </div>
        </div>
    );
};

export default SinglePostPage;