import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = "http://localhost:5000/"; 
const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // 🔄 Handle form input changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ General API handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "register" : "login";

    try {
      const payload = isRegister
        ? formData // username, email, password
        : { email: formData.email, password: formData.password }; // only login fields

      const res = await axios.post(`${API_BASE_URL}user/${endpoint}`, payload);
      alert(res.data.message || (isRegister ? "Registered!" : "Logged in!"));
    } catch (err) {
      console.error(err);
      alert("API Error: " + (err.response?.data?.message || err.message));
    }
  };

  // ✅ Google login handler
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const googlePayload = {
        email: decoded.email,
        name: decoded.name,
        googleId: decoded.sub,
        profilePic: decoded.picture
      };

      const res = await axios.post(`${API_BASE_URL}/google-login`, googlePayload);
      alert("Google Sign-In Success: " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("Google login failed.");
    }
  };

  return (
    <div className="h-screen w-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="bg-zinc-800 p-6 rounded-md w-full max-w-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to AuthPage</h1>

        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 rounded-l ${!isRegister ? 'bg-blue-500' : 'bg-gray-700'}`}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-r ${isRegister ? 'bg-blue-500' : 'bg-gray-700'}`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
          {isRegister && (
            <input
              className="p-2 rounded bg-zinc-700 text-white placeholder-gray-300"
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            className="p-2 rounded bg-zinc-700 text-white placeholder-gray-300"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 rounded bg-zinc-700 text-white placeholder-gray-300"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-green-500 py-2 rounded">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => alert("Google Login Failed")}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
