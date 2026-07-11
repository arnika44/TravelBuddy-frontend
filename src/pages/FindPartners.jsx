import { useEffect, useState } from "react";
import axios from "axios";

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
          .get(`${API}/find-partners/${profile.gender}/${profile.destination}`)
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
          </div>
        ))
      )}
    </div>
  );
}