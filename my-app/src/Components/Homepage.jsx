import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import "../styles/Homepage.css";

function Homepage() {
    const navigate = useNavigate();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    let decodedToken = null;
    let username = "Guest"; // Default username

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

    const goToSubmitNewLesson = () => {
        navigate("/submit-new-lesson"); // Navigate to Submit New Lesson page
    };

    const goToPendingLessons = () => {
        navigate("/UserPendingLessons"); // Navigate to Pending Lessons page
    };

    return (
        <div className="homepage-body">
            <div className="homepage-container">
                {/* Header Section */}
                <header className="homepage-header">
                    <div className="homepage-username animated-text">
                        Hello, {username}
                    </div>
                    <button className="homepage-logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </header>

                {/* Welcoming Text Section */}
                <div className="homepage-welcome">
                    <h2>Welcome to your dashboard, {username}!</h2>
                    <p>Use the options below to manage your lessons and tasks.</p>
                </div>

                {/* Main Section with Squares */}
                <main className="homepage-main">
                    <div
                        className="homepage-square homepage-square-1"
                        onClick={() => navigate("/user-lessons")}
                    >
                        <div className="square-icon">&#128214;</div> {/* Book Icon */}
                        <span>
                            View Lessons
                            <br />
                            <span className="square-text-arabic">عرض الدروس</span>
                        </span>
                    </div>
                    <div
                        className="homepage-square homepage-square-2"
                        onClick={goToSubmitNewLesson}
                    >
                        <div className="square-icon">&#9998;</div> {/* Pencil Icon */}
                        <span>
                            Submit New Lesson
                            <br />
                            <span className="square-text-arabic">إرسال درس جديد</span>
                        </span>
                    </div>
                    <div
                        className="homepage-square homepage-square-3"
                        onClick={goToPendingLessons}
                    >
                        <div className="square-icon">&#128338;</div> {/* Clock Icon */}
                        <span>
                            View Pending Lessons
                            <br />
                            <span className="square-text-arabic">عرض الدروس المعلقة</span>
                        </span>
                    </div>
                    <div
                        className="homepage-square homepage-square-4"
                        onClick={() => navigate("/technical-problem")}
                    >
                        <div className="square-icon">&#9888;</div> {/* Warning Icon */}
                        <span>
                            Technical Problem
                            <br />
                            <span className="square-text-arabic">مشكلة تقنية</span>
                        </span>
                    </div>
                    <div
                        className="homepage-square homepage-square-5"
                        onClick={() => navigate("/suggestion")}
                    >
                        <div className="square-icon">&#128161;</div> {/* Lightbulb Icon */}
                        <span>
                            Suggestion
                            <br />
                            <span className="square-text-arabic">اقتراح</span>
                        </span>
                    </div>
                    <div className="homepage-square homepage-square-6">
                        <div className="square-icon">&#128640;</div> {/* Rocket Icon */}
                        <span>
                            Coming Soon
                            <br />
                            <span className="square-text-arabic">قريبًا</span>
                        </span>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Homepage;
