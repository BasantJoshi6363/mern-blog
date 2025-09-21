import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PostContext } from '../context/PostContext';

const DeletePage = () => {
    const { id } = useParams();
    const {deletePost} = useContext(PostContext)
    deletePost(id);

    return (
        <div>DeletePage</div>
    )
}

export default DeletePage