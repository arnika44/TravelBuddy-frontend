import { Link } from "react-router-dom";

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div style={{display:"flex"}}>

      {/* Sidebar */}

      <div
        style={{
          width:"250px",
          height:"100vh",
          background:"#0d6efd",
          color:"white",
          padding:"20px"
        }}
      >

        <h2>TravelBuddy</h2>

        <hr/>

        <p><Link to="/profile" style={link}>👤 My Profile</Link></p>

        <p><Link to="/history" style={link}>📜 History</Link></p>

        <p><Link to="/change-password" style={link}>🔒 Change Password</Link></p>

      </div>

      {/* Main */}

      <div style={{padding:"30px",flex:1}}>

        <h1>Welcome {user?.name} 👋</h1>

        <h3>Dashboard</h3>

        <p>
          Next step me profile fill karna hoga.
        </p>

      </div>

    </div>

  );

}

const link={
  color:"white",
  textDecoration:"none"
};