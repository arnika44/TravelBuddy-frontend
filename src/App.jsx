import React, { useState } from "react";
import axios from "axios";

// ✅ Live Backend URL
const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // ================= REGISTER =================
  const register = async () => {
    try {
      await axios.post(`${API}/register`, {
        name,
        email,
        phone,
        password
      });

      alert("Registered Successfully");
      setIsLogin(true);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

    } catch (err) {
      alert(err.response?.data?.message || "Register Failed");
    }
  };

  // ================= LOGIN =================
  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
        phone,
        password
      });

      alert("Welcome " + res.data.user.name);

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>🚀 TravelBuddy</h1>

      {isLogin ? (
        <div>
          <h2>Login</h2>

          <input
            placeholder="Phone Number"
            style={inputStyle}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={password}
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
        <div>
          <h2>Register</h2>

          <input
            placeholder="Name"
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Phone Number"
            style={inputStyle}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={password}
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