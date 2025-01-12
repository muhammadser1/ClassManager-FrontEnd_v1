import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import
import "../styles/Suggestion.css";

function Suggestion() {
    const [suggestion, setSuggestion] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Format the message to include the username
        const formattedMsg = `${username}:{${suggestion}}`;

        try {
            const response = await fetch(`http://127.0.0.1:8000/teacher/submit-suggestion?msg=${encodeURIComponent(formattedMsg)}`, {
                method: "POST", // Use POST method to match the backend
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend validation error:", errorData);
                alert(`Error: ${errorData.detail || "Unknown error occurred"}`);
                return;
            }

            const data = await response.json();
            alert(`تم إرسال الاقتراح بنجاح: ${data.message}`);
            setSuggestion(""); // Clear the textarea after successful submission
        } catch (error) {
            console.error("Error submitting suggestion:", error.message);
            alert("حدث خطأ أثناء إرسال الاقتراح. حاول مرة أخرى لاحقًا.");
        }
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
