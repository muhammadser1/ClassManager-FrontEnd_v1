import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`http://localhost:8000/auth/forgot-password?email=${encodeURIComponent(email)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to send reset email");
            }

            const data = await response.json();
            setSuccess(data.message); // Show success message
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
        } catch (error) {
            console.error("Forgot password error:", error.message);
            setError(error.message); // Set the error message
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h1>Forgot Password</h1>
                <p>Enter your email address to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleChange}
                        className="forgot-password-input"
                        required
                    />
                    {error && <p className="forgot-password-error">{error}</p>}
                    {success && <p className="forgot-password-success">{success}</p>}
                    <button type="submit" className="forgot-password-submit">
                        Reset Password
                    </button>
                </form>
                <button className="forgot-password-back" onClick={goToLogin}>
                    Back to Login
                </button>
            </div>
        </div>
    );
}

export default ForgotPassword;
