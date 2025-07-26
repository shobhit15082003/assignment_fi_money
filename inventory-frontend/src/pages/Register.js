import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      alert("✅ User registered successfully!");
      console.log("User registered");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      alert("❌ Failed to register. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📝 Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Create a password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="relative group w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-200 shadow-md"
          >
            Register
            <span className="absolute hidden group-hover:block text-xs bg-black text-white rounded px-2 py-1 top-[-35px] left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
              Create your account
            </span>
          </button>
        </form>

        {/* 🆕 Already have an account link */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600 mr-1">
            Already have an account?
          </span>
          <div
            onClick={() => navigate("/login")}
            className="inline-block text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition duration-200 relative group"
          >
            Login
            <span className="absolute hidden group-hover:block text-xs bg-black text-white rounded px-2 py-1 top-[-35px] left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
              Go to Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
