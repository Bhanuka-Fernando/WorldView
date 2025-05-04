import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
// import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import CountryDetail from "./pages/CountryDetail";
import About from "./pages/About";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/favorites" element={ <Favorites />} />
        <Route path="/country/:cca3" element={ <CountryDetail />} />
        <Route path="/about" element={ <About />} />
      </Routes>
    </Router>
  )
}

export default App
