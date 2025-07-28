import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"
import { RxCross2 } from "react-icons/rx";
import { IoIosCreate } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const clickHandler = () => {
        setOpenProfile(prev => !prev);
    }
    const { user, isAuthenticated } = useContext(AuthContext);
    return (
        <nav className="bg-black text-white p-6 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to={"/"} className="text-xl font-bold text-white">My Blog</Link>
                        </div>

                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/about" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                            <Link to="/blog" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</Link>
                            <Link to="/contact" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                        </div>
                    </div>
                    <div className="hidden md:block relative">
                        {isAuthenticated ? (<div>
                            <div onClick={clickHandler} className="profile size-10 rounded-full bg-green-600 cursor-pointer flex items-center justify-center text-white hover:opacity-80">{user.username[0].toUpperCase()}</div>
                            {openProfile && (<div className=' absolute mt-2 left-[-150px] h-38 w-50 bg-zinc-600 text-white'>
                                <button onClick={clickHandler} className='float-right p-2 cursor-pointer text-white'><RxCross2 size={18} /></button>
                                <ul>
                                    <Link to={"/create"} className='flex  gap-3 p-2 hover:bg-zinc-400 w-full'>
                                        <IoIosCreate size={20} className='inline-block mr-2' />
                                        <p className='text-[13px]'>Create Post</p>
                                    </Link>
                                    <Link to={"/profile"} className='flex  gap-3 p-2 hover:bg-zinc-400 w-full'>
                                        <FaUserAlt size={20} className='inline-block mr-2' />
                                        <p className='text-[13px]' >Profile</p>
                                    </Link>
                                    <Link to={"/logout"} className='flex  gap-3 p-2 hover:bg-zinc-400 w-full'>
                                        <IoLogOut size={20} className='inline-block mr-2' />
                                        <p className='text-[13px] '>Logout</p>
                                    </Link>

                                </ul>
                            </div>)}
                        </div>) : (
                            <div className="ml-4 flex items-center md:ml-6 gap-3">
                                <button className='px-5 py-2 bg-black text-white'><Link to={"/login"}>sign in</Link> </button>
                                <button className='px-5 py-2 bg-black text-white'><Link to={"/register"}>sign up</Link> </button>
                            </div>
                        )}

                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
                        <a href="#" className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
                        <a href="#" className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Blog</a>
                        <a href="#" className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar