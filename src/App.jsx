import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

// ================= STYLES =================
const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "5px 0 15px 0",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const btnStyle = {
  padding: "10px",
  margin: "5px 0",
  width: "100%",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

// ================= MAIN APP =================
export default function App() {
  const [screen, setScreen] = useState("register");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  const [otp, setOtp] = useState("");

  // ================= OTP =================
  const sendOtp = async () => {
    await axios.post(`${API}/send-otp`, { email });
    alert("OTP sent");
    setScreen("otp");
  };

  const verifyOtp = async () => {
    const res = await axios.post(`${API}/verify-otp`, {
      email,
      otp
    });

    if (res.data.success) {
      alert("OTP Verified");
      setScreen("register");
    } else {
      alert("Wrong OTP");
    }
  };

  // ================= REGISTER =================
  const register = async () => {
    await axios.post(`${API}/register`, {
      name,
      email,
      password,
      aadhaar
    });

    alert("Registered Successfully");
    setScreen("login");
  };

  // ================= LOGIN =================
  const login = async () => {
    const res = await axios.post(`${API}/login`, {
      aadhaar,
      password
    });

    alert("Welcome " + res.data.user.name);
    setScreen("dashboard");
  };

  // ================= UI =================
  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h1>🚀 TravelBuddy</h1>

      {/* OTP SCREEN */}
      {screen === "otp" && (
        <div>
          <h3>OTP Verification</h3>

          <label>Enter OTP</label>
          <input
            style={inputStyle}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button style={btnStyle} onClick={verifyOtp}>
            Verify OTP
          </button>
        </div>
      )}

      {/* REGISTER */}
      {screen === "register" && (
        <div>
          <h3>Register</h3>

          <label>Name</label>
          <input style={inputStyle} onChange={(e) => setName(e.target.value)} />

          <label>Email</label>
          <input style={inputStyle} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input
            style={inputStyle}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Aadhaar</label>
          <input style={inputStyle} onChange={(e) => setAadhaar(e.target.value)} />

          <button style={btnStyle} onClick={sendOtp}>
            Send OTP
          </button>

          <button style={btnStyle} onClick={register}>
            Register
          </button>
        </div>
      )}

      {/* LOGIN */}
      {screen === "login" && (
        <div>
          <h3>Login</h3>

          <label>Aadhaar</label>
          <input style={inputStyle} onChange={(e) => setAadhaar(e.target.value)} />

          <label>Password</label>
          <input
            style={inputStyle}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={btnStyle} onClick={login}>
            Login
          </button>
        </div>
      )}

      {/* DASHBOARD */}
      {screen === "dashboard" && (
        <div>
          <h2>🎉 Welcome to TravelBuddy Dashboard</h2>
        </div>
      )}
    </div>
  );
}