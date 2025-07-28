import { createContext, useCallback, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const PostContext = createContext();


export const PostProvider = ({ children }) => {
    const { setLoading } = useContext(AuthContext);
    const [post, setPost] = useState([])
    const {singlePost,setSinglePost} = useState(null);
    const createPost = useCallback(async (postInfo) => {
        setLoading(true);
        const formdata = new FormData();
        formdata.append("title", postInfo.title);
        formdata.append("body", postInfo.body);
        formdata.append("category", postInfo.category);
        formdata.append("file", postInfo.file);
        // setLoading(true);
        // Logic to create a post
        try {
            const response = await axios.post("http://localhost:5000/api/v1/create", formdata, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            console.log(response.data);
            <Navigate to="/" replace />;
            if (response.data.success) {
                toast.success("Post created successfully");
            } else {
                toast.error("Failed to create post");
            }
        } catch (error) {
            toast.error("Failed to create post");
            setLoading(false);
        }
        setLoading(false);

    }, []);

    const getPosts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/posts");
            setPost(response.data.result)
            if (response.data.success) {
                return response.data.posts;
            } else {
                toast.error("Failed to fetch posts");
            }
        } catch (error) {
            toast.error("Failed to fetch posts");
        }
        setLoading(false);
    }, []);

    const getSinglePost = useCallback(async (id) => {
        setLoading(true);
        try {
           
            const response = await axios.get(`http://localhost:5000/api/post/${id}`);
            console.log(response.data.result);
            setSinglePost(response.data.result);
            if (response.data.success) {
                return response.data.post;
            } else {
                toast.error("Failed to fetch post");
            }
        } catch (error) {
            toast.error("Failed to fetch post");
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        getPosts();
    }, [])
    return (
        <PostContext.Provider value={{ createPost, getPosts, post, getSinglePost,singlePost }}>
            {children}
        </PostContext.Provider>
    )
}