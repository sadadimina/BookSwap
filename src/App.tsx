import "./App.css";
import Header from "./components/ui/Header";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Toaster } from "sonner";
import { useState } from "react";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <div>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/" element={<div className="p-6">Home</div>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster richColors closeButton position="top-center" />
      </div>
    </>
  );
}

export default App;
