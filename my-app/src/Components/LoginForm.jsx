import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Decode JWT Token
import "../styles/common.css"; // Import custom CSS

function LoginForm() {
    const navigate = useNavigate();
    const [isTypingPassword, setIsTypingPassword] = useState(false);
    const [formData, setFormData] = useState({ name: "", password: "" });
    const [error, setError] = useState("");
    const [role, setRole] = useState(""); // Added role state

    const handleFocus = () => setIsTypingPassword(true);
    const handleBlur = () => setIsTypingPassword(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset errors

        try {
            const response = await fetch("http://localhost:8000/auth/login-teacher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Invalid credentials");
            }

            const data = await response.json();
            console.log("Login successful:", data);
            alert(data.message); // Show success message

            // Store the JWT token in localStorage
            localStorage.setItem("token", data.token);

            // Decode the JWT to check the role and redirect
            const decodedToken = jwt_decode(data.token);
            const userRole = decodedToken.role;
            setRole(userRole); // Update the role state
            // Redirect based on role
            if (userRole === "admin") {
                navigate("/admin-dashboard"); // Navigate to admin dashboard
            } else {
                navigate("/home"); // Navigate to teacher's home page
            }
        } catch (error) {
            console.error("Login error:", error.message);
            setError(error.message); // Set the error message
        }
    };

    const goToSignup = () => {
        navigate("/signup");
    };

    const goToForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <div className="container">
            <div className="header">
                <div
                    className="monkey-emoji"
                    style={{ transform: isTypingPassword ? "scale(1.1)" : "scale(1)" }}
                >
                    {isTypingPassword ? "🙈" : "🐵"}
                </div>
                <h1>Welcome Back, Teacher!</h1>
                <p className="welcome-text">We're so glad to see you again. Log in to manage your lessons and inspire your students!</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your username"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                />
                {error && <p className="error">{error}</p>} {/* Styled error */}
                <button type="submit">Login</button>
            </form>

            {/* Display the role after login */}
            {role && <p className="helper-text">Logged in as {role}</p>}

            <p className="helper-text">
                Don't have an account?{" "}
                <button className="link-button" onClick={goToSignup}>
                    Sign up here
                </button>
            </p>

            {/* Forgot Password Link */}
            <p className="helper-text">
                <button className="link-button" onClick={goToForgotPassword}>
                    Forgot Password?
                </button>
            </p>
        </div>
    );
}

export default LoginForm;
