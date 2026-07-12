import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        style={{
          padding: "15px 20px"
        }}
      >
        <div
          onClick={() => setOpen(true)}
          style={{
            fontSize: "30px",
            cursor: "pointer",
            width: "fit-content"
          }}
        >
          ☰
        </div>

        <h2
          style={{
            marginTop: "15px",
            marginBottom: "5px"
          }}
        >
          🚀 TravelBuddy
        </h2>

        <p
          style={{
            margin: 0,
            color: "#555",
            fontSize: "17px"
          }}
        >
          Welcome {user?.name} 👋
        </p>
      </div>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}