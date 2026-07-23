import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function Chats() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [chatList, setChatList] = useState([]);

  useEffect(() => {

    axios
      .get(`${API}/matched-users/${user.phone}`)
      .then((res) => {

        setChatList(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);

  return (

    <div>

      <Navbar title="Chats" />

      <div style={{ padding: "20px" }}>

        <h2>Your Chats</h2>

        {chatList.length === 0 ? (

          <p>No chats yet.</p>

        ) : (

          chatList.map((p) => (

            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "12px",
                cursor: "pointer"
              }}
              onClick={() => {

                localStorage.setItem(
                  "chatPartner",
                  JSON.stringify(p)
                );

                window.location.href = "/chat";

              }}
            >

              <h3>{p.fullName}</h3>

              <p>{p.destination}</p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}