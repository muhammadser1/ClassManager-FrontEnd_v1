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

                {/* Main Section with 6 Squares */}
                <main className="homepage-main">
                    <div className="homepage-square homepage-square-1">
                        <div className="square-icon">&#128214;</div> {/* Book Icon */}
                        <span>View Lessons</span>
                    </div>
                    <div className="homepage-square homepage-square-2">
                        <div className="square-icon">&#9998;</div> {/* Pencil Icon */}
                        <span>Submit New Lesson</span>
                    </div>
                    <div className="homepage-square homepage-square-3">
                        <div className="square-icon">&#128338;</div> {/* Clock Icon */}
                        <span>View Pending Lessons</span>
                    </div>
                    <div className="homepage-square homepage-square-4">
                        <div className="square-icon">&#9888;</div> {/* Warning Icon */}
                        <span>Technical Problem</span>
                    </div>
                    <div className="homepage-square homepage-square-5">
                        <div className="square-icon">&#128161;</div> {/* Lightbulb Icon */}
                        <span>Suggestion</span>
                    </div>
                    <div className="homepage-square homepage-square-6">
                        <div className="square-icon">&#128640;</div> {/* Rocket Icon */}
                        <span>Coming Soon</span>
                    </div>
                </main>


            </div>
        </div>
    );
}

export default Homepage;
