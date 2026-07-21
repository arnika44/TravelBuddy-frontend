import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function FindPartners() {
  console.log("FindPartners Page Loaded");
  const [partners, setPartners] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    axios
      .get(`${API}/get-profile/${user.phone}`)
      .then((res) => {

        const profile = res.data;

        axios
          .get(`${API}/find-partners/${user.phone}`)
          .then((response) => {

            console.log("Partners API:", response.data);

            const filtered = response.data.filter(
              (p) => p.userPhone !== user.phone
            );

            setPartners(filtered);

          })
          .catch((err) => {
            console.log(err);
          });

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
  <div>

    <Navbar title="Find Partners" />

    <div style={{ padding: "20px" }}>
      <h2>Find Travel Partners</h2>

      {partners.length === 0 ? (
        <p>No partners found.</p>
      ) : (
        partners.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{p.fullName}</h3>
            <p><b>Gender:</b> {p.gender}</p>
            <p><b>Destination:</b> {p.destination}</p>
            <p><b>Budget:</b> ₹{p.budget}</p>
            <p><b>Days:</b> {p.days}</p>
            <p><b>Stay:</b> {p.stay}</p>
            {p.requestStatus === "none" && (
  <button
    onClick={async () => {

      const user = JSON.parse(localStorage.getItem("user"));

      try {

        const res = await axios.post(`${API}/send-request`, {
          senderPhone: user.phone,
          receiverPhone: p.userPhone,
        });

        alert(res.data.message);

        window.location.reload();

      } catch (err) {

        alert("Failed to send request");

      }

    }}
    style={{
      padding: "10px 18px",
      background: "#0d6efd",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "10px"
    }}
  >
    Send Request
  </button>
)}

{p.requestStatus === "sent" && (
  <button
    disabled
    style={{
      padding: "10px 18px",
      background: "gray",
      color: "white",
      border: "none",
      borderRadius: "6px",
      marginTop: "10px"
    }}
  >
    Request Sent
  </button>
)}

{p.requestStatus === "received" && (
  <>
    <button
      style={{
        padding: "10px 18px",
        background: "green",
        color: "white",
        border: "none",
        borderRadius: "6px",
        marginRight: "10px",
        marginTop: "10px"
      }}
    >
      Accept
    </button>

    <button
      style={{
        padding: "10px 18px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "6px",
        marginTop: "10px"
      }}
    >
      Reject
    </button>
  </>
)}

{p.requestStatus === "matched" && (
  <button
    disabled
    style={{
      padding: "10px 18px",
      background: "green",
      color: "white",
      border: "none",
      borderRadius: "6px",
      marginTop: "10px"
    }}
  >
    Matched
  </button>
)}
          </div>
        ))
      )}
        </div>

  </div>
  );
}