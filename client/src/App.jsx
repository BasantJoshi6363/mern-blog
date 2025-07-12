import React from 'react'
import "./index.css";
import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import ProtectedRoute from "../src/component/Routes/ProtectedRoute"
import PublicRoute from "../src/component/Routes/PublicRoute"
import Login from './component/Auth/Login'
import Register from './component/Auth/Register'
import Navbar from './component/UI/Navbar';
import SinglePostPage from './component/Post/SinglePage';

const App = () => {
  return (
    <div className='bg-black text-white h-full w-[100vw]'>
      <ProtectedRoute />
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path='/:id' element={<SinglePostPage />}></Route>
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>}></Route>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}></Route>
      </Routes>
    </div>
  )
}

export default App