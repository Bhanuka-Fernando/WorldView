import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    password: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      username: form.username,
      email: form.email,
      phone: form.phone,
    };
    if (form.password) {
      updatedUser.password = form.password;
    }

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("username");
      localStorage.removeItem("loggedIn");
      alert("Account deleted successfully.");
      window.location.href = "/";
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-12 px-6">
        <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            My Profile
          </h2>

          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src="https://freesvg.org/img/abstract-user-flat-4.png" 
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow"
              />
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            {["username", "email", "phone"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 capitalize mb-1">
                  {field}
                </label>
                {editMode ? (
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleInputChange}
                    type={field === "email" ? "email" : "text"}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="text-gray-800 font-medium">{user[field] || "N/A"}</div>
                )}
              </div>
            ))}

            {editMode && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  type="password"
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-10 space-y-4">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                Edit Profile
              </button>
            )}

            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
