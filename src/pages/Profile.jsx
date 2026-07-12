import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "https://travelbuddy-backend-4w7o.onrender.com";

export default function Profile() {

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    budget: "",
    destination: "",
    days: "",
    stay: "",
    travelWith: "",
    preferredGender: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return;

  axios
    .get(`${API}/get-profile/${user.phone}`)
    .then((res) => {
      setForm(res.data);
    })
    .catch(() => {
      console.log("No profile found");
    });

}, []);
  const saveProfile = async () => {

  try {

    const user = JSON.parse(localStorage.getItem("user"));

    const { _id, __v, ...profileData } = form;

    await axios.post(`${API}/save-profile`, {
      ...profileData,
      userPhone: user.phone
    });

    alert("Profile Saved Successfully ✅");

  } catch (err) {

    alert("Profile Save Failed");

  }

};

  return (
  <div>

    <Navbar />

    <div
      style={{
        maxWidth: "700px",
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
  Travel Profile
</h2>

<label style={label}>Full Name *</label>
<input
  type="text"
  name="fullName"
  value={form.fullName}
  onChange={handleChange}
  style={input}
/>

<label style={label}>Age *</label>
<input
  type="number"
  name="age"
  value={form.age}
  onChange={handleChange}
  style={input}
/>

<label style={label}>Gender *</label>
<select
  name="gender"
  value={form.gender}
  onChange={handleChange}
  style={input}
>
  <option value="">Select Gender</option>
  <option>Male</option>
  <option>Female</option>
  <option>Other</option>
</select>

<label style={label}>Budget (₹) *</label>
<input
  type="number"
  name="budget"
  value={form.budget}
  onChange={handleChange}
  style={input}
/>

<label style={label}>Destination *</label>
<input
  type="text"
  name="destination"
  value={form.destination}
  onChange={handleChange}
  style={input}
/>

<label style={label}>Number of Days *</label>
<input
  type="number"
  name="days"
  value={form.days}
  onChange={handleChange}
  style={input}
/>

 <label style={label}>Stay Preference *</label>

<select
  name="stay"
  value={form.stay}
  onChange={handleChange}
  style={input}
>
  <option value="">Stay Preference</option>
  <option>Hotel</option>
  <option>Hostel</option>
  <option>Villa</option>
  <option>Resort</option>
  <option>Homestay</option>
  <option>Guest House</option>
  <option>Camping</option>
</select>

<label style={label}>Travel With *</label>

<select
  name="travelWith"
  value={form.travelWith}
  onChange={handleChange}
  style={input}
>
  <option value="">Travel With</option>
  <option>Solo</option>
  <option>Friends</option>
  <option>Family</option>
  <option>Couple</option>
</select>

{form.travelWith === "Solo" && (
  <>
    <label style={label}>Preferred Partner Gender</label>

    <select
      name="preferredGender"
      value={form.preferredGender}
      onChange={handleChange}
      style={input}
    >
      <option value="">Preferred Partner Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Any</option>
    </select>
  </>
)}

<label style={label}>Profile Photo</label>

<input
  type="file"
  accept="image/*"
  style={input}
/>

<label style={label}>ID Proof (Aadhaar / Passport / Driving Licence)</label>
<input
  type="file"
  accept="image/*"
  style={input}
/>

<button
  onClick={saveProfile}
  style={{
    width: "100%",
    padding: "12px",
    background: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  }}
>
  Save Profile
</button>

    </div>

  </div>
);
}
const label = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "bold",
  color: "#333"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};