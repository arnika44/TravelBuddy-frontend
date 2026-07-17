import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ title }) {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("user");
  navigate("/");
};

  return (
    <>
      <div
        style={{
          height: "60px",
          background: "#111827",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 15px",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}
      >
        <div
          style={{
            fontSize: "28px",
            cursor: "pointer"
          }}
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: "24px"
          }}
        >
          🚀 TravelBuddy
        </h2>

        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#2563eb"
          }}
        ></div>
      </div>

      <h2
        style={{
          margin: "20px"
        }}
      >
        {title}
      </h2>

      {open && (
  <div
    style={{
      position: "fixed",
      top: 60,
      left: 0,
      width: "240px",
      height: "100%",
      background: "#1f2937",
      color: "white",
      padding: "20px",
      zIndex: 999
    }}
  >
    <p>
      <Link to="/dashboard" style={link} onClick={() => setOpen(false)}>
        🏠 Dashboard
      </Link>
    </p>

    <p>
      <Link to="/profile" style={link} onClick={() => setOpen(false)}>
        👤 My Profile
      </Link>
    </p>

    <p>
      <Link to="/history" style={link} onClick={() => setOpen(false)}>
        📜 History
      </Link>
    </p>

    <p>
      <Link to="/find-partners" style={link} onClick={() => setOpen(false)}>
        🤝 Find Partners
      </Link>
    </p>

    <p>
      <Link to="/change-password" style={link} onClick={() => setOpen(false)}>
        🔒 Change Password
      </Link>
    </p>

    <hr />

    <button
      onClick={logout}
      style={{
        width: "100%",
        padding: "10px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      🚪 Logout
    </button>
  </div>
)}
    </>
  );
}
const link = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px"
};