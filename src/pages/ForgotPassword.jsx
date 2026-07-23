import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const sendOtp = async () => {

  if (!phone) {

    alert("Enter phone number");

    return;

  }

  try {

    const res = await axios.post(`${API}/send-otp`, {
      phone
    });

    alert(res.data.message);

    setOtpSent(true);

  } catch (err) {

    alert("Failed to send OTP");

  }

};

const verifyOtp = async () => {

  if (!otp) {

    alert("Enter OTP");

    return;

  }

  try {

    const res = await axios.post(
      `${API}/forgot-password-verify-otp`,
      {
        phone,
        otp
      }
    );

    if (res.data.success) {

      alert(res.data.message);

      setOtpVerified(true);

    } else {

      alert(res.data.message);

    }

  } catch (err) {

    alert("OTP verification failed");

  }

};
const resetPassword = async () => {

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
      phone,
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
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      {!otpSent && (

        <button
          onClick={sendOtp}
          style={{
            width: "100%",
            padding: "10px"
          }}
        >
          Send OTP
        </button>

      )}

      {otpSent && !otpVerified && (

        <>

          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              marginBottom: "10px"
            }}
          />

          <button
            onClick={verifyOtp}
            style={{
              width: "100%",
              padding: "10px"
            }}
          >
            Verify OTP
          </button>

        </>

      )}

      {otpVerified && (

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

      )}

    </div>

  );

}