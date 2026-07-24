import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function ForgotPassword() {

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

const resetPassword = async () => {

  if (!email) {
  alert("Enter Email");
  return;
}

  if (!newPassword || !confirmPassword) {
    alert("Fill all fields");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {

    const res = await axios.post(`${API}/reset-password`, {
      email,
      newPassword
    });

    alert(res.data.message);

    navigate("/");

  } catch (err) {

    alert(err.response?.data?.message || "Reset Failed");

  }

};

  return (

    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        textAlign: "center"
      }}
    >

      <h2>Forgot Password</h2>

      <input
  placeholder="Email"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  style={{
    width:"100%",
    padding:"10px",
    marginBottom:"10px"
  }}
/>
        <>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px"
            }}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px"
            }}
          />

          <button
            onClick={resetPassword}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px"
            }}
          >
            Reset Password
          </button>

        </>

    </div>

  );

}