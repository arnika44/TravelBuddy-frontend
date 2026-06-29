import React, { useState } from "react";
import axios from "axios";

// 🔴 CHANGE THIS WHEN BACKEND IS LIVE
const API = "http://localhost:5000";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  // ================= REGISTER =================
  const register = async () => {
    try {
      await axios.post(`${API}/register`, {
        name,
        email,
        phone,
        password,
        aadhaar
      });

      alert("Registered Successfully");
      setIsLogin(true);
    } catch (err) {
      alert("Register Failed");
    }
  };

  // ================= LOGIN =================
  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
        aadhaar,
        password
      });

      alert("Welcome " + res.data.user.name);
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>🚀 TravelBuddy</h1>

      {/* ================= LOGIN ================= */}
      {isLogin ? (
        <div>
          <h2>Login</h2>

          <input
            placeholder="Aadhaar"
            style={inputStyle}
            onChange={(e) => setAadhaar(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={btnStyle} onClick={login}>
            Login
          </button>

          <p style={linkStyle} onClick={() => setIsLogin(false)}>
            Don't have an account? Register
          </p>
        </div>
      ) : (
        /* ================= REGISTER ================= */
        <div>
          <h2>Register</h2>

          <input
            placeholder="Name"
            style={inputStyle}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            style={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Phone Number"
            style={inputStyle}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            placeholder="Aadhaar"
            style={inputStyle}
            onChange={(e) => setAadhaar(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={btnStyle} onClick={register}>
            Create Account
          </button>

          <p style={linkStyle} onClick={() => setIsLogin(true)}>
            Already have an account? Login
          </p>
        </div>
      )}
    </div>
  );
}

// ================= STYLES =================
const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px"
};

const linkStyle = {
  color: "blue",
  cursor: "pointer",
  textAlign: "center",
  marginTop: "10px"
};