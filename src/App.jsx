import { Routes, Route } from "react-router-dom";
import ReceivedRequests from "./pages/ReceivedRequests";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import History from "./pages/History";
import FindPartners from "./pages/FindPartners";
import ChangePassword from "./pages/ChangePassword";
import Chat from "./pages/Chat";
import Chats from "./pages/Chats";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} />
      <Route path="/find-partners" element={<FindPartners />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/received-requests" element={<ReceivedRequests />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chats" element={<Chats />} />

    </Routes>
  );
}