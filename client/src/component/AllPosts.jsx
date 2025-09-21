import axios from 'axios';
import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react'
import toast from 'react-hot-toast';

const AllPosts = () => {

    const getPostAfterLogin = useCallback(async () => {
        try {
            await axios.get("http://localhost:5000/api/afterlogin",{
                headers:{
                    Authorization : localStorage.getItem("token")
                }
            })
        } catch (error) {
            // toast.error(error.message)
            console.log(error);
        }
    },
        [],
    )
    useEffect(() => {
        getPostAfterLogin()
    }, []);
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2>Our Feed</h2>
        </div>
    )
}

export default AllPosts