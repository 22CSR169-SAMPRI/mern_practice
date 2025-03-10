import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", width: "320px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "4px" }}>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "4px" }}>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "4px" }}>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
          </div>
          <button type="submit" style={{ backgroundColor: "#3b82f6", color: "white", padding: "10px", borderRadius: "4px", border: "none", cursor: "pointer" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;
