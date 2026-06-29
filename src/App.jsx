import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000"; // बाद में deploy के बाद बदल देंगे

export default function App() {
  const [screen, setScreen] = useState("register");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  const [otp, setOtp] = useState("");

  // ================= SEND OTP =================
  const sendOtp = async () => {
    try {
      await axios.post(`${API}/send-otp`, { email });
      alert("OTP sent");
      setScreen("otp");
    } catch (err) {
      alert("OTP failed");
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
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
    } catch (err) {
      alert("Error verifying OTP");
    }
  };

  // ================= REGISTER =================
  const register = async () => {
    try {
      await axios.post(`${API}/register`, {
        name,
        email,
        password,
        aadhaar
      });

      alert("Registered Successfully");
      setScreen("login");
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
      setScreen("dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🚀 TravelBuddy</h1>

      {/* OTP SCREEN */}
      {screen === "otp" && (
        <div>
          <h3>OTP Verification</h3>
          <input
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}

      {/* REGISTER */}
      {screen === "register" && (
        <div>
          <h3>Register</h3>

          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <input placeholder="Aadhaar" onChange={(e) => setAadhaar(e.target.value)} />

          <button onClick={sendOtp}>Send OTP</button>
          <button onClick={register}>Register</button>
        </div>
      )}

      {/* LOGIN */}
      {screen === "login" && (
        <div>
          <h3>Login</h3>

          <input placeholder="Aadhaar" onChange={(e) => setAadhaar(e.target.value)} />
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

          <button onClick={login}>Login</button>
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