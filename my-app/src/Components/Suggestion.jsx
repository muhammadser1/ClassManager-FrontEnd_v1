import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import "../styles/Suggestion.css"; // Import CSS for styling

function Suggestion() {
    const [suggestion, setSuggestion] = useState("");
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
            const decodedToken = jwtDecode(token); // Decode the token
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
            console.error("Error decoding token:", error.message);
            setError("رمز المصادقة غير صالح.");
            navigate("/login");
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const confirmed = window.confirm(`تم إرسال الاقتراح بنجاح بواسطة: ${username} (${email})\nاضغط موافق للعودة إلى الصفحة الرئيسية.`);
        if (confirmed) {
            navigate("/homepage"); // Navigate to homepage
        }
        setSuggestion(""); // Clear the form
    };

    return (
        <div className="suggestion-container" dir="rtl">
            <h1>إرسال اقتراح</h1>
            {error && <p className="error-message">{error}</p>}
            <form className="suggestion-form" onSubmit={handleSubmit}>
                <textarea
                    className="suggestion-textarea"
                    placeholder="اكتب اقتراحك هنا..."
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    required
                />
                <button type="submit" className="suggestion-submit">
                    إرسال
                </button>
            </form>

            {/* Back to Home Button */}
            <button className="suggestion-back-button" onClick={() => navigate("/homepage")}>
                العودة إلى الصفحة الرئيسية
            </button>
        </div>
    );
}

export default Suggestion;
