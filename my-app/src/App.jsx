import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"; // Home page component
import Login from "./Components/LoginForm"; // Login page component
import Signup from "./Components/SignUpForm"; // Login page component
import Homepage from "./Components/Homepage"; // Login page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* Added Login route */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />

      </Routes>
    </Router>
  );
}

export default App; // Ensure this is a default export
