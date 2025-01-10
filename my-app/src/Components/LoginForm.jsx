import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/login.css"; // Import custom CSS

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

            // Decode the JWT token
            const decodedToken = jwtDecode(data.token);

            // Check if the token has expired
            if (decodedToken.exp * 1000 < Date.now()) {
                setError("Token has expired. Please log in again.");
                return;
            }

            const userRole = decodedToken.role;
            setRole(userRole); // Update the role state

            // Redirect based on role
            if (userRole === "admin") {
                navigate("/admin-dashboard"); // Navigate to admin dashboard
            } else {
                navigate("/homepage"); // Navigate to teacher's home page
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

    const goHome = () => {
        navigate("/home");
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header-container">
                    <div
                        className="login-emoji-container"
                        style={{ transform: isTypingPassword ? "scale(1.5)" : "scale(1.5)" }}
                    >
                        {isTypingPassword ? "🙈" : "🐵"}
                    </div>
                    <h1 className="login-title">Login</h1>
                </div>
                <form className="login-form-container" onSubmit={handleSubmit}>
                    <div className="login-input-container">
                        <label htmlFor="username" className="login-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="name"
                            className="login-input"
                            placeholder="Enter your username"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="login-input-container">
                        <label htmlFor="password" className="login-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="login-input"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                        />
                    </div>
                    {error && <p className="login-error">{error}</p>}
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                {role && <p className="login-role-display">Logged in as {role}</p>}

                <p className="login-helper-text">
                    Don't have an account?{" "}
                    <button className="login-link-button" onClick={goToSignup}>
                        Sign up here
                    </button>
                </p>

                <p className="login-helper-text">
                    <button className="login-link-button" onClick={goToForgotPassword}>
                        Forgot Password?
                    </button>
                </p>

                {/* New "Go Home" Button */}
                <div className="login-home-button-container">
                    <button className="login-home-button" onClick={goHome}>
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;