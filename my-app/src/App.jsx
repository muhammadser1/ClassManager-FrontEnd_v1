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
import HomepageAdmin from "./Components/HomepageAdmin"; // Suggestion component
import AdminPendingLessons from "./Components/AdminPendingLessons"; // Suggestion component
import AdminApprovedLessons from "./Components/AdminApprovedLessons"; // Suggestion component
import AdminSummaryAnalytics from "./Components/AdminSummaryAnalytics"; // Suggestion component
import AdminStudentSummary from "./Components/AdminStudentSummary"; // Suggestion component
import ForgotPassword from "./Components/ForgotPassword"; // Suggestion component
import ResetPassword from "./components/ResetPassword";
import AdminAddEvent from "./components/AdminAddEvent";


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
        <Route path="/HomepageAdmin" element={<HomepageAdmin />} /> {/* User Lessons */}
        <Route path="/AdminPendingLessons" element={<AdminPendingLessons />} /> {/* User Lessons */}
        <Route path="/AdminApprovedLessons" element={<AdminApprovedLessons />} /> {/* User Lessons */}
        <Route path="/AdminSummaryAnalytics" element={<AdminSummaryAnalytics />} /> {/* User Lessons */}
        <Route path="/AdminStudentSummary" element={<AdminStudentSummary />} /> {/* User Lessons */}
        <Route path="/ForgotPassword" element={<ForgotPassword />} /> {/* User Lessons */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/AdminAddEvent" element={<AdminAddEvent />} />

      </Routes>
    </Router>
  );
}

export default App; // Ensure this is a default export
