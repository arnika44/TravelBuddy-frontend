import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
        phone,
        password,
      });

      alert("Welcome " + res.data.user.name);

      // User ko save karna
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Dashboard par bhejna
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={container}>
      <h1>🚀 TravelBuddy</h1>

      <h2>Login</h2>

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={input}
      />

        <div style={{ position: "relative", width: "100%", marginBottom: "10px" }}>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={input}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      userSelect: "none",
      fontSize: "18px"
    }}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>

</div>

      <button style={button} onClick={login}>
        Login
      </button>

      <p>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

const container = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "20px",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
};

const button = {
  width: "100%",
  padding: "10px",
  cursor: "pointer",
};