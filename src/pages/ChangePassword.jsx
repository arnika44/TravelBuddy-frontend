import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function ChangePassword() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async () => {

    if (newPassword !== confirmPassword) {

      alert("Passwords do not match");

      return;

    }

    try {

      const res = await axios.post(`${API}/change-password`, {

        phone: user.phone,
        currentPassword,
        newPassword

      });

      alert(res.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {

      alert(
        err.response?.data?.message || "Password change failed"
      );

    }

  };

  return (

    <div>

      <Navbar title="Change Password" />

      <div
        style={{
          padding: "20px",
          maxWidth: "400px",
          margin: "auto"
        }}
      >

        <h2>Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px"
          }}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px"
          }}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px"
          }}
        />

        <button
          onClick={changePassword}
          style={{
            width: "100%",
            padding: "12px",
            background: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Update Password
        </button>

      </div>

    </div>

  );

}