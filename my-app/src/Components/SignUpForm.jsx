import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpForm.css";

function SignupForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        birthday: "", // Added birthday field
    });
    const [isTypingPassword, setIsTypingPassword] = useState(false); // Track password input focus
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleFocus = () => setIsTypingPassword(true);
    const handleBlur = () => setIsTypingPassword(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:8000/auth/signup-teacher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Signup failed");
            }

            const data = await response.json();
            console.log("Signup successful:", data);
            setSuccess(data.message); // Set the success message
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
        } catch (error) {
            console.error("Signup error:", error.message);
            setError(error.message); // Set the specific error message
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-header">
                    <div
                        className="signup-monkey-emoji"
                        style={{ transform: isTypingPassword ? "scale(1.1)" : "scale(1)" }}
                    >
                        {isTypingPassword ? "🙈" : "🐵"}
                    </div>
                    <h1 className="signup-title">Signup</h1>
                </div>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        className="signup-input"
                        placeholder="Enter your username"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        className="signup-input"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="signup-input"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                    <input
                        type="date"
                        name="birthday"
                        className="signup-input"
                        placeholder="Enter your birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />
                    {error && <p className="signup-error">{error}</p>}
                    {success && <p className="signup-success">{success}</p>}
                    <button type="submit" className="signup-button">Signup</button>
                </form>
                <div className="signup-navigate-login">
                    <p className="signup-helper-text">
                        Already have an account?{" "}
                        <button className="signup-link-button" onClick={() => navigate("/login")}>
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
