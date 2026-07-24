import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function Chat() {

  const user = JSON.parse(localStorage.getItem("user"));
  const partner = JSON.parse(localStorage.getItem("chatPartner"));

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const loadMessages = () => {

    axios
      .get(`${API}/messages/${user.phone}/${partner.phone}`)
      .then((res) => {

        setMessages(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  };

  useEffect(() => {

    loadMessages();

  }, []);

  const sendMessage = async () => {

    if (!message.trim()) return;

    try {

      await axios.post(`${API}/send-message`, {
  sender: user.phone,
  receiver: partner.phone,
  message
      });

      setMessage("");

      loadMessages();

    } catch (err) {

      alert("Message Failed");

    }

  };

  return (

    <div>

      <Navbar title={partner.fullName} />

      <div style={{ padding: "20px" }}>

        {messages.map((m) => (

          <div
            key={m._id}
            style={{
              textAlign:
  m.sender === user.phone ? "right" : "left",
              marginBottom: "10px"
            }}
          >
            <span
              style={{
                display: "inline-block",
                background:
                  m.sender === user.phone
                    ? "#0d6efd"
                    : "#ddd",
                color:
                  m.sender === user.phone
                    ? "white"
                    : "black",
                padding: "10px",
                borderRadius: "8px"
              }}
            >
              {m.message}
            </span>
          </div>

        ))}

        <div style={{ marginTop: "20px" }}>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
            style={{
              width: "75%",
              padding: "10px"
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "10px 20px",
              marginLeft: "10px"
            }}
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );

}