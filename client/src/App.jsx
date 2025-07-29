import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Loader = lazy(() => import('./component/Loader'));
const ProtectedRoute = lazy(() => import('./component/ProtectedRoute'));
const CreatePost = lazy(() => import('./component/CreatePost'));
const Logout = lazy(() => import('./component/Logout'));
const Profile = lazy(() => import('./component/Profile'));
const About = lazy(() => import('./component/About'));
const Blog = lazy(() => import('./component/Blog'));
const Contact = lazy(() => import('./component/Contact'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./component/Login'));
const Register = lazy(() => import('./component/Register'));
const PublicRoute = lazy(() => import('./component/PublicRoute'));
const Navbar = lazy(() => import('./component/Navbar'));
const SinglePage = lazy(() => import('./component/SinglePage'));


const App = () => {
  const navigate = useNavigate();
  

  // if(loading) return <Loader />;
  return (
    <div className='relative bg-black text-white  min-h-screen'>
      <Navbar className="absolute z-50" />
      <Suspense className="p-6" fallback={<Loader />}>
        <Routes>
          <Route path='/blog' index element={<Blog />} />
          <Route path='/' element={<Home />}></Route>
          <Route path='/:id' element={<SinglePage />}></Route>
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}></Route>
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>}></Route>
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
          <Route path='/create' element={<ProtectedRoute><CreatePost /></ProtectedRoute>}></Route>
          <Route path='/logout' element={<ProtectedRoute><Logout /></ProtectedRoute>}></Route>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<h1>404 Not Found</h1>}></Route>
        </Routes>
      </Suspense>
    </div>

  )
}

export default App