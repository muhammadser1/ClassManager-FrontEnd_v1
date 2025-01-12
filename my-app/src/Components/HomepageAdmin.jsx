import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import "../styles/homepage_admin.css";

function HomepageAdmin() {
    const navigate = useNavigate();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    let decodedToken = null;
    let username = "Admin"; // Default username for the admin

    try {
        if (token) {
            decodedToken = jwtDecode(token); // Decode the token
            if (decodedToken && decodedToken.username) {
                username = decodedToken.username; // Assign username from the token
            }
        }
    } catch (error) {
        console.error("Error decoding token:", error.message);
    }

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token
        navigate("/home"); // Redirect to the homepage
    };

    const goToPendingLessons = () => {
        navigate("/AdminPendingLessons"); // Navigate to Pending Lessons page
    };

    const goToViewAllLessons = () => {
        navigate("/AdminApprovedLessons"); // Navigate to All Lessons page
    };

    const goToTeacherSummary = () => {
        navigate("/AdminSummaryAnalytics"); // Navigate to Teacher Summary/Analytics page
    };

    const goToChildSummary = () => {
        navigate("/AdminStudentSummary"); // Navigate to Child Summary page
    };
    const goToAddEvent = () => navigate("/AdminAddEvent");
    return (
        <div className="homepage_admin-body">
            <div className="homepage_admin-container">
                {/* Header Section */}
                <header className="homepage_admin-header">
                    <div className="homepage_admin-username animated-text">
                        Welcome, {username}
                    </div>
                    <button className="homepage_admin-logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </header>

                {/* Welcoming Text Section */}
                <div className="homepage_admin-welcome">
                    <h2>Admin Dashboard</h2>
                    <p>Manage all lessons, tasks, and analytics from here.</p>
                </div>
                {/* Main Section with Squares */}
                <main className="homepage_admin-main">
                    <div
                        className="homepage_admin-square homepage_admin-square-1"
                        onClick={goToPendingLessons}
                    >
                        <div className="homepage_admin-square-icon">&#128338;</div> {/* Clock Icon */}
                        <span>
                            Pending Lessons
                            <br />
                            <span className="homepage_admin-square-text-arabic">الدروس المعلقة</span>
                        </span>
                    </div>
                    <div
                        className="homepage_admin-square homepage_admin-square-2"
                        onClick={goToViewAllLessons}
                    >
                        <div className="homepage_admin-square-icon">&#128214;</div> {/* Book Icon */}
                        <span>
                            View All Lessons
                            <br />
                            <span className="homepage_admin-square-text-arabic">كل الدروس</span>
                        </span>
                    </div>
                    <div
                        className="homepage_admin-square homepage_admin-square-3"
                        onClick={goToTeacherSummary}
                    >
                        <div className="homepage_admin-square-icon">&#128202;</div> {/* Bar Chart Icon */}
                        <span>
                            Teacher Summary
                            <br />
                            <span className="homepage_admin-square-text-arabic">
                                ملخص المعلمين (تحليل البيانات)
                            </span>
                        </span>
                    </div>
                    <div
                        className="homepage_admin-square homepage_admin-square-4"
                        onClick={goToChildSummary}
                    >
                        <div className="homepage_admin-square-icon">&#128103;</div> {/* Child Icon */}
                        <span>
                            Child Summary
                            <br />
                            <span className="homepage_admin-square-text-arabic">
                                عدد الساعات للأطفال
                            </span>
                        </span>
                    </div>
                    <div className="homepage_admin-square homepage_admin-square-5" onClick={goToAddEvent}>
                        <span>Add Event</span>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default HomepageAdmin;
