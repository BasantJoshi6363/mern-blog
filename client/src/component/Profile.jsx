import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoPencil } from "react-icons/io5";
import Post from './Post';

const Profile = () => {
  const { user, addSocialLinks } = useContext(AuthContext);
  const { getUserPost, userPost } = useContext(PostContext);
  const [click, setClick] = useState(false);
  const [formdata, setFormdata] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    whatsapp: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (user?.userId) {
      addSocialLinks(user.userId, formdata);
    }
    setClick(false);
  };

  const clickHandler = () => {
    setClick(prev => !prev);
  };

  useEffect(() => {
    if (user) {
      setFormdata({
        facebook: user.facebook || "",
        instagram: user.instagram || "",
        twitter: user.twitter || "",
        linkedin: user.linkedin || "",
        whatsapp: user.whatsapp || "",
      });

      if (user.userId) {
        getUserPost(user.userId);
      }
    }
  }, [user, getUserPost]);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <h1 className="text-3xl font-bold mb-6 text-gray-100">Profile</h1>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        {/* User Info */}
        <div className="mb-6">
          <p className="text-lg mb-2">
            <strong className="text-gray-300">Username:</strong>
            <span className="text-gray-100"> {user?.username}</span>
          </p>
          <p className="text-lg mb-4">
            <strong className="text-gray-300">Email:</strong>
            <span className="text-gray-100"> {user?.email}</span>
          </p>
          <Link
            to="/create"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Create Post
          </Link>
        </div>

        {/* Social Links Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-gray-300">Add Your Social Links</p>
            <button
              onClick={clickHandler}
              className="size-8 hover:bg-gray-600 rounded-full flex items-center justify-center transition duration-200"
            >
              <IoPencil className="text-gray-100 cursor-pointer" />
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            {user?.facebook && (
              <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} className="text-blue-500 hover:text-blue-400 transition duration-200" />
              </a>
            )}
            {user?.instagram && (
              <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} className="text-pink-500 hover:text-pink-400 transition duration-200" />
              </a>
            )}
            {user?.twitter && (
              <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} className="text-blue-400 hover:text-blue-300 transition duration-200" />
              </a>
            )}
            {user?.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} className="text-blue-600 hover:text-blue-500 transition duration-200" />
              </a>
            )}
            {user?.whatsapp && (
              <a href={`https://wa.me/${user.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={24} className="text-green-500 hover:text-green-400 transition duration-200" />
              </a>
            )}
          </div>
        </div>

        <hr className="border-gray-700 mb-6" />

        {/* User Posts */}
        <div>
          {userPost.length === 0 ? (
            <p className="text-gray-400">No posts available...</p>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Your Posts</h2>
              {userPost.map((val) => (
                <Post
                  key={val._id}
                  val={{
                    title: val.title,
                    id: val._id,
                    body: val.body,
                    image: val.imageUrl,
                    create: val.createdAt,
                    category: val.category,
                    user: { username: val.user.username },
                    userid: val.user._id,
                    comment: val.comment,
                    like: val.like,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Modal for Adding Social Links */}
      {click && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-100">Add Social Links</h2>
              <button
                onClick={clickHandler}
                className="size-8 hover:bg-gray-600 rounded-full flex items-center justify-center transition duration-200"
              >
                <RxCross2 className="text-gray-100 cursor-pointer" />
              </button>
            </div>

            <form onSubmit={submitHandler}>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <FaFacebook size={18} className="text-blue-500" />
                  <input
                    type="text"
                    name="facebook"
                    value={formdata.facebook}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                    className="flex-1 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </li>
                <li className="flex items-center gap-3">
                  <FaInstagram size={18} className="text-pink-500" />
                  <input
                    type="text"
                    name="instagram"
                    value={formdata.instagram}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                    className="flex-1 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </li>
                <li className="flex items-center gap-3">
                  <FaTwitter size={18} className="text-blue-400" />
                  <input
                    type="text"
                    name="twitter"
                    value={formdata.twitter}
                    onChange={handleChange}
                    placeholder="Twitter URL"
                    className="flex-1 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </li>
                <li className="flex items-center gap-3">
                  <FaLinkedin size={18} className="text-blue-600" />
                  <input
                    type="text"
                    name="linkedin"
                    value={formdata.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn URL"
                    className="flex-1 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </li>
                <li className="flex items-center gap-3">
                  <FaWhatsapp size={18} className="text-green-500" />
                  <input
                    type="text"
                    name="whatsapp"
                    value={formdata.whatsapp}
                    onChange={handleChange}
                    placeholder="WhatsApp Number"
                    className="flex-1 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </li>
              </ul>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
