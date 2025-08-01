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
    const token = localStorage.getItem("token");
    const [post, setPost] = useState([])
    const [singlePost, setSinglePost] = useState({});
    const [like, setLiked] = useState(null);
    const baseurl = "http://localhost:5000/api";
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
            const response = await axios.post(`${baseurl}/v1/create`, formdata, {
                headers: {
                    Authorization: token
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
            const response = await axios.get(`${baseurl}/posts`);
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
            const response = await axios.get(`${baseurl}/post/${id}`);
            setSinglePost(response.data.result)
            // setSinglePost(response.data.result);
            if (response.data.success) {
                return response.data.post;
            } else {
                toast.error("Failed to fetch post");
            }
        } catch (error) {
            toast.error("Failed to fetch post");
            setLoading(false)
        }
        setLoading(false);
    }, []);


    const createComment = useCallback(async (postId, comment) => {
        setLoading(true);

        try {
            const response = await axios.post(`${baseurl}/comment/${postId}`, { content: comment }, {
                headers: {
                    Authorization: token
                }
            });
            if (response.data.success) {
                toast.success("Comment added successfully");
                window.location.reload();
            } else {
                toast.error("Failed to add comment");
            }
        } catch (error) {
            toast.error("Failed to add comment");
        }
        setLoading(false);
    }, []);

    const createLike = useCallback(async (postId) => {
        console.log(token)

        try {
            const response = await axios.post(`http://localhost:5000/api/post/like/${postId}`, null, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data)
            setLiked(response.data.success)

        } catch (error) {
            toast.error(error);
            console.log(error)
        }
    }, []);
    const disLike = useCallback(async (postId) => {
        setLoading(true);

    })

    useEffect(() => {
        getPosts();
    }, [])
    return (
        <PostContext.Provider value={{ createPost, getPosts, post, getSinglePost, singlePost, createComment, createLike, like }}>
            {children}
        </PostContext.Provider>
    )
}