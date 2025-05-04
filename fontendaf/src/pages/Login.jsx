import React, { useState } from 'react';
import { loginUser } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser(username, password)) {
      localStorage.setItem("loggedIn", "true");
      navigate("/home");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-vector/world-map-infographic-infochart-business-600nw-2493998765.jpg')",
      }}
    >


      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white/90 backdrop-blur-md p-10 rounded-xl shadow-2xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back 👋</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Please enter your credentials to continue.
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Log In
        </button>

        <div className="mt-5 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-3">
            By logging in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
