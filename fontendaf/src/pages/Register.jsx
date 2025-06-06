import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(username, password);
    alert("Registered Successfully.");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-vector/world-map-infographic-infochart-business-600nw-2493998765.jpg')",
      }}
    >

      {/* Register Card */}
      <form
        onSubmit={handleRegister}
        className="relative z-10 bg-white/90 backdrop-blur-md p-10 rounded-xl shadow-2xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create an Account ✨</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Join us today! It’s quick and easy.
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
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Register
        </button>

        <div className="mt-5 text-center">
          <p className="text-xs text-gray-400">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </form>
    </div>
  );
}
