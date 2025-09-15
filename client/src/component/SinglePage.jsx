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
    const [comment, setComment] = useState("");
    const { createComment, getSinglePost, singlePost } = useContext(PostContext);
    const { isAuthenticated, loading } = useContext(AuthContext);
    const [click, setClick] = useState(false);

    function clickHandler() {
        setClick(prev => !prev);
    }

    function mouseLeaveEvent() {
        setClick(false);
    }
    useEffect(() => {

        getSinglePost(id);
        checkIsAuthor();


    }, [])

    async function checkIsAuthor() {
        try {
            const response = await axios.get(`http://localhost:5000/api/poste/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
            );
            console.log("function is calling bro");

        } catch (error) {
            console.log(error);
        }
    }
    checkIsAuthor();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!comment) {
            toast.error("Comment cannot be empty");

        }
        if (!isAuthenticated) {
            toast.error("You must be logged in to comment");
            return <Navigate to={"/login"} />;
        }
        createComment(singlePost._id, comment);
        setComment("");
    }
    //    if(loading){
    //     return <Loader/>
    //    }
    return (
        <div>
            {/* <h1>{singlePost.title}</h1>
            <img src={singlePost.imageUrl} alt="" />
            <p>{singlePost.body}</p> */}
            <div className="min-h-screen bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                <div className="top flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        {/* <ProfileShape val={singlePost?.user?.username} /> */}
                        {/* <p>{singlePost.user.username}⭐</p> */}
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
                <div onClick={clickHandler} className="relative float-right text-2xl">
                    <PiDotsThreeVerticalBold  className='cursor-pointer hover:opacity-85' />
                    {click && (<div onMouseLeave={mouseLeaveEvent}  className='absolute right-0 w-50 h-fit bg-zinc-700 flex flex-col text-sm p-2'>
                        <Link className='hover:bg-zinc-600' to={`/edit/${id}`}>edit</Link>
                        <Link className='hover:bg-zinc-600'to={`/delete/${id}`}>delete</Link>
                    </div>)}

                </div>
                <div className="lower">
                    <h1 className='mt-10 text-4xl'>{singlePost?.title}</h1>
                    <p className='uppercase opacity-60 mt-2'>Published  {moment(singlePost.createdAt).format('YYYY MMM DD HH.mm')}</p>
                    <div className="h-[500px] w-full mt-5">
                        <img src={singlePost.imageUrl} className='size-full object-cover' alt="" />
                    </div>

                    <p className='mt-5'>{singlePost.body}</p>

                    <form onSubmit={submitHandler} className='flex items-center gap-5 mt-5'>
                        <input className='w-1/3 px-3 py-3 border-none outline-none bg-zinc-700' type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder='write your comment: ' />
                        <Button val={"Send Comment"} />
                    </form>

                    <div className="mt-5"></div>
                    {singlePost?.comment?.length === 0 ? (<>
                        <h3>No comment Available....</h3>
                    </>) : (<>
                        {singlePost?.comment?.map((com, i) => {
                            return <div key={i} id='comment' className='flex flex-col'>
                                <div className="flex gap-3 items-center">
                                    <div className="">
                                        <Link to={`/user/${com?.user._id}`}>
                                            <ProfileShape val={com?.user.username} />
                                        </Link>
                                    </div>
                                    <div className="w-[300px] bg-zinc-700 p-2 rounded-md">
                                        <p className='text-[11px] opacity-70'>{com?.user.username}</p>
                                        <p className='text-[13px]'>{com?.content}</p>
                                    </div>
                                </div>
                                <p className='text-[11px] opacity-70 ml-12 mt-2'>{moment(com?.createdAt).from()}</p>

                                <br />
                            </div>
                        })}
                    </>)}

                </div>
            </div >
        </div>


    );
};

export default SinglePost;
