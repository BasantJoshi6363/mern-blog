import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from "react-hot-toast";
import { PostProvider } from './context/PostContext.jsx'

const AuthProvider = lazy(() => import("./context/AuthContext.jsx"))

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId='482469396285-1bbmmcf1ktr8iglimf6s2jtgs4bh0f0n.apps.googleusercontent.com'>
      <AuthProvider>
        <PostProvider>
          <Toaster />
          <App />
        </PostProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
)
