import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-md px-6 sm:px-10 py-4 flex justify-between items-center z-50 sticky top-0 font-poppins">
      {/* Logo */}
      <Link to="/home" className="text-2xl font-extrabold text-gray-900 tracking-wide">
        🌍 WorldView
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 sm:space-x-10">
        {["/home", "/favorites", "/about"].map((path) => {
          const label = path.replace("/", "") || "home";
          return (
            <Link
              key={path}
              to={path}
              className={`relative text-sm sm:text-base font-medium transition-all ${
                isActive(path)
                  ? "text-black after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </Link>
          );
        })}

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-gray-800 hover:text-black transition focus:outline-none"
          >
            <FaUserCircle size={28} />
            {username && (
              <span className="text-sm font-medium hidden sm:inline-block">{username}</span>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 animate-fade-in-down">
              <div className="absolute -top-2 right-5 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200" />
              <Link
                to="/profile"
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all"
              >
                👤 View Profile
              </Link>
              <hr className="border-t border-gray-100" />
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
