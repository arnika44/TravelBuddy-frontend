import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const register = async () => {

    try {

      await axios.post(`${API}/register`, {
  name,
  email,
  phone,
  password
});

localStorage.setItem(
  "user",
  JSON.stringify({
    name,
    phone,
    email
  })
);

alert("Registered Successfully");

navigate("/dashboard");

    } catch (err) {

      alert(err.response?.data?.message || "Register Failed");

    }

  };

  return (

    <div style={container}>

      <h1>🚀 TravelBuddy</h1>

      <h2>Register</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        style={input}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={input}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
        style={input}
      />

      <div style={{ position: "relative", width: "100%", marginBottom: "10px" }}>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
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

      <button style={button} onClick={register}>
        Register
      </button>

      <p>

        Already have an account?

        <Link to="/"> Login </Link>

      </p>

    </div>

  );

}

const container={
  maxWidth:"400px",
  margin:"50px auto",
  textAlign:"center"
}

const input={
  width:"100%",
  padding:"10px",
  margin:"10px 0"
}

const button={
  width:"100%",
  padding:"10px",
  cursor:"pointer"
}