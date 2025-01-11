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

        // Create the payload to match the backend schema
        const suggestionData = {
            username,          // String: matches "username" in the backend
            email,             // String: matches "email" in the backend
            msg: suggestion,   // String: matches "msg" in the backend
        };

        // Debugging: Print the payload to ensure correctness
        console.log("Sending data:", JSON.stringify(suggestionData));

        try {
            const response = await fetch("http://127.0.0.1:8000/teacher/submit-suggestion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json", // Matches the backend expectation
                },
                body: JSON.stringify(suggestionData), // Convert object to JSON
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend validation error:", errorData);
                alert(`Error: ${errorData.detail[0]?.msg || "Unknown error occurred"}`);
                return;
            }

            const data = await response.json();
            alert(`تم إرسال الاقتراح بنجاح: ${data.message}`);
            navigate("/homepage");
            setSuggestion("");
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
