import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-5">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-white text-center mb-6">Login</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" className="p-3 bg-gray-800 text-white rounded-lg" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="p-3 bg-gray-800 text-white rounded-lg" value={formData.password} onChange={handleChange} required />
          <a href="/register" className="text-lime-400 hover:text-lime-300 text-sm text-center">
            Don't have an account? Register
          </a>
          <button type="submit" className="bg-lime-500 text-gray-900 font-bold p-3 rounded-lg">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
