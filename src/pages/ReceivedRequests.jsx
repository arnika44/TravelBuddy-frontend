import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function ReceivedRequests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Logged in user:", user);

    if (!user) return;
    console.log("Fetching requests for:", user.phone);

    axios
      .get(`${API}/received-requests/${user.phone}`)
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div>

      <Navbar title="Received Requests" />

      <div style={{ padding: "20px" }}>

        <h2>Received Requests</h2>

        {requests.length === 0 ? (
          <p>No Requests Yet.</p>
        ) : (
          requests.map((r) => (

            <div
              key={r._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px"
              }}
            >
              <h3>{r.sender.fullName}</h3>

<p><b>Gender:</b> {r.sender.gender}</p>

<p><b>Destination:</b> {r.sender.destination}</p>

<p><b>Budget:</b> ₹{r.sender.budget}</p>

<p><b>Days:</b> {r.sender.days}</p>

<button
  style={{
    padding: "8px 15px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer"
  }}
>
  Accept
</button>

<button
  style={{
    padding: "8px 15px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Reject
</button>
            </div>

          ))
        )}

      </div>

    </div>
  );
}