import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function FindPartners() {

  const [partners, setPartners] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    axios
      .get(`${API}/get-profile/${user.name}`)
      .then((res) => {

        const profile = res.data;

        axios
          .get(
            `${API}/find-partners/${profile.gender}/${profile.destination}`
          )
          .then((response) => {
            const currentUser = JSON.parse(localStorage.getItem("user"));

            const filtered = response.data.filter
             ((p) => p.fullName !== currentUser.name
          );

            setPartners(filtered);
          });

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
              borderRadius: "8px"
            }}
          >
            <h3>{p.fullName}</h3>
            <p>Gender: {p.gender}</p>
            <p>Destination: {p.destination}</p>
            <p>Budget: ₹{p.budget}</p>
            <p>Days: {p.days}</p>
            <p>Stay: {p.stay}</p>
          </div>
        ))
      )}
    </div>
  );
}