import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import "../styles/TechnicalProblem.css";

function TechnicalProblem() {
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Decode token to fetch username and email
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found in localStorage.");
            setError("يجب تسجيل الدخول للوصول إلى هذه الصفحة.");
            navigate("/login");
            return;
        }

        try {
            console.log("Token found:", token); // Debug log
            const decodedToken = jwtDecode(token); // Decode the token
            console.log("Decoded Token:", decodedToken); // Debug log
            const currentTime = Date.now() / 1000; // Get current time in seconds
            if (decodedToken.exp < currentTime) {
                console.error("Token has expired.");
                setError("رمز المصادقة منتهي الصلاحية. يرجى تسجيل الدخول مرة أخرى.");
                navigate("/login");
                return;
            }
            if (decodedToken.username && decodedToken.email) {
                setUsername(decodedToken.username); // Set the username
                setEmail(decodedToken.email); // Set the email
            } else {
                console.error("Username or email not found in token.");
                setError("رمز المصادقة غير صالح.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error decoding token:", error.message); // Debug log
            setError("رمز المصادقة غير صالح.");
            navigate("/login");
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Show confirmation message and redirect to homepage
        const confirmed = window.confirm(`تم إرسال المشكلة بنجاح بواسطة: ${username} (${email})\nاضغط موافق للعودة إلى الصفحة الرئيسية.`);
        if (confirmed) {
            navigate("/homepage"); // Navigate to homepage
        }
        setDescription(""); // Clear the form
    };

    return (
        <div className="technical-problem-container" dir="rtl">
            <h1>الإبلاغ عن مشكلة تقنية</h1>
            {error && <p className="error-message">{error}</p>}
            <form className="technical-problem-form" onSubmit={handleSubmit}>
                <textarea
                    className="technical-problem-textarea"
                    placeholder="اكتب وصف المشكلة هنا..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit" className="technical-problem-submit">
                    إرسال
                </button>
            </form>

            {/* Back to Home Button */}
            <button className="technical-problem-back-button" onClick={() => navigate("/homepage")}>
                العودة إلى الصفحة الرئيسية
            </button>
        </div>
    );
}

export default TechnicalProblem;
