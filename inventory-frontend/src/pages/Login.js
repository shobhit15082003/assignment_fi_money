import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Login failed");
      }

      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard");
      } else {
        throw new Error("No access_token received");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🔐 Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="Enter your username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="Enter your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="relative group w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all duration-200 shadow-md"
          >
            Login
            <span className="absolute hidden group-hover:block text-xs bg-black text-white rounded px-2 py-1 top-[-35px] left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
              Sign in to your account
            </span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600 mr-1">Don't have an account?</span>
          <div
            onClick={() => navigate("/register")}
            className="inline-block text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition duration-200 relative group"
          >
            Create one
            <span className="absolute hidden group-hover:block text-xs bg-black text-white rounded px-2 py-1 top-[-35px] left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
              Go to registration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
