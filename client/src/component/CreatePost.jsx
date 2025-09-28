import React, { useContext, useState } from 'react';
import { PostContext } from '../context/PostContext';

const categories = [
  "Technology",
  "Lifestyle",
  "Travel",
  "Education",
  "Food",
  "Health",
  "Business",
  "Entertainment",
];

const CreatePost = () => {
  const { createPost, isSubmitting } = useContext(PostContext);
  const [formdata, setFormdata] = useState({
    title: "",
    body: "",
    category: "",
    image: null,
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createPost({
      title: formdata.title,
      body: formdata.body,
      category: formdata.category,
      file: formdata.image,
    });

    setFormdata({
      title: "",
      body: "",
      category: "",
      image: null,
    });
    e.target.reset();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Post</h1>
      <form onSubmit={submitHandler} className="space-y-6">

        <input
          required
          value={formdata.title}
          onChange={handlechange}
          name="title"
          type="text"
          placeholder="Enter title"
          className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          required
          value={formdata.body}
          onChange={handlechange}
          name="body"
          placeholder="Enter body"
          rows={5}
          className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          required
          name="category"
          value={formdata.category}
          onChange={handlechange}
          className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          required
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              image: e.target.files[0],
            }))
          }
          className="w-full text-gray-300 file:bg-gray-700 file:text-white file:px-4 file:py-2 file:border-none file:rounded-md cursor-pointer focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold text-lg transition duration-300"
        >
          {isSubmitting ? "Creating Post..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
