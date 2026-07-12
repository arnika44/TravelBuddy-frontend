import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#0d6efd",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0
      }}
    >
      <h2>🚀 TravelBuddy</h2>

      <hr />

      <p><Link to="/dashboard" style={link}>🏠 Dashboard</Link></p>

      <p><Link to="/profile" style={link}>👤 My Profile</Link></p>

      <p><Link to="/history" style={link}>📜 History</Link></p>

      <p><Link to="/find-partners" style={link}>🤝 Find Partners</Link></p>

      <p><Link to="/change-password" style={link}>🔒 Change Password</Link></p>

      <button
        onClick={logout}
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

    </div>
  );
}

const link = {
  color: "white",
  textDecoration: "none"
};