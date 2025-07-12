import axios from 'axios'
import React, { useCallback, useState } from 'react'
import Spinner from '../Spinner'

const CreatePost = () => {
    const [loading, setLoading] = useState(false)
    const [formdata, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        image: ""
    })
    const createPost = useCallback(async (info) => {
        const data = new FormData();
        data.append("title", info.title)
        data.append("content", info.content)
        data.append("category", info.category)
        data.append("file", info.image)
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:5000/create", data,
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            )

            console.log(response.data)
            setLoading(false);
            window.location.reload();

        } catch (error) {
            console.log(error)
        }
    }, [1])
    function checkHandler(event) {
        const { name, value, files } = event.target
        if (name === "image") {
            setFormData(prev => {
                return {
                    ...prev,
                    image: files[0]
                }
            })
        }
        else {
            setFormData(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }
    }
    function formHandler(event) {
        event.preventDefault();
        // console.log(formdata)
        createPost(formdata);
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 py-6 font-sans">
            {loading ? (
                <Spinner />
            ) : (
                <form onSubmit={formHandler} className="space-y-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Create New Post</h2>
                    <input
                        type="text"
                        name="title"
                        value={formdata.title}
                        onChange={checkHandler}
                        placeholder="Title"
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        name="content"
                        value={formdata.content}
                        onChange={checkHandler}
                        placeholder="Content"
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        name="category"
                        value={formdata.category}
                        onChange={checkHandler}
                        placeholder="Category"
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={checkHandler}
                        className="text-white"
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    )}
export default CreatePost