import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"; // Home page component
import Login from "./Components/LoginForm"; // Login page component
import Signup from "./Components/SignUpForm"; // Login page component
import Homepage from "./Components/Homepage"; // Login page component
import SubmitNewLesson from "./Components/SubmitNewLesson";
import UserPendingLessons from "./Components/UserPendingLessons";
import TechnicalProblem from "./Components/TechnicalProblem";
import Suggestion from "./Components/Suggestion"; // Suggestion component
import UserLessons from "./Components/UserLessons"; // UserLessons component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* Added Login route */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/submit-new-lesson" element={<SubmitNewLesson />} />
        <Route path="/UserPendingLessons" element={<UserPendingLessons />} /> {/* Added Pending Lessons */}
        <Route path="/technical-problem" element={<TechnicalProblem />} />
        <Route path="/suggestion" element={<Suggestion />} /> {/* Suggestion page */}
        <Route path="/user-lessons" element={<UserLessons />} /> {/* User Lessons */}

      </Routes>
    </Router>
  );
}

export default App; // Ensure this is a default export
