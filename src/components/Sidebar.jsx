import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.3)",
            zIndex: 999
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: open ? 0 : "-260px",
          width: "250px",
          height: "100vh",
          background: "#0d6efd",
          color: "white",
          padding: "20px",
          transition: "0.3s",
          zIndex: 1000
        }}
      >
        <h2>🚀 TravelBuddy</h2>

        <hr />

        <p><Link onClick={() => setOpen(false)} to="/dashboard" style={link}>🏠 Dashboard</Link></p>

        <p><Link onClick={() => setOpen(false)} to="/profile" style={link}>👤 My Profile</Link></p>

        <p><Link onClick={() => setOpen(false)} to="/history" style={link}>📜 History</Link></p>

        <p><Link onClick={() => setOpen(false)} to="/find-partners" style={link}>🤝 Find Partners</Link></p>

        <p><Link onClick={() => setOpen(false)} to="/change-password" style={link}>🔒 Change Password</Link></p>

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
    </>
  );
}

const link = {
  color: "white",
  textDecoration: "none"
};