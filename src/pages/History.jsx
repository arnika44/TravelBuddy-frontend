import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function History() {

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`${API}/history/${user.phone}`)
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div style={{ padding: "30px" }}>

      <h2>Travel History</h2>

      {profiles.length === 0 ? (

        <p>No travel history found.</p>

      ) : (

        profiles.map((item, index) => (

          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)"
            }}
          >

            <h3>{item.fullName}</h3>

            <p><b>Age:</b> {item.age}</p>

            <p><b>Gender:</b> {item.gender}</p>

            <p><b>Destination:</b> {item.destination}</p>

            <p><b>Budget:</b> ₹{item.budget}</p>

            <p><b>Days:</b> {item.days}</p>

            <p><b>Stay:</b> {item.stay}</p>

            <p><b>Travel With:</b> {item.travelWith}</p>

            {item.preferredGender && (
              <p><b>Preferred Partner:</b> {item.preferredGender}</p>
            )}

          </div>

        ))

      )}

    </div>

  );

}                 