import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div style={{display:"flex"}}>

      {/* Sidebar */}

      <Sidebar />

      <div
  style={{
    marginLeft: "270px",
    padding: "30px",
    flex: 1
  }}
>

        <h1>Welcome {user?.name} 👋</h1>

        <h3>Dashboard</h3>

        <p>
  Please complete your travel profile to start finding travel partners.
</p>

<Link
  to="/profile"
  style={{
    display: "inline-block",
    marginTop: "20px",
    background: "#0d6efd",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold"
  }}
>
  Complete Profile →
</Link>

      </div>

    </div>

  );

}