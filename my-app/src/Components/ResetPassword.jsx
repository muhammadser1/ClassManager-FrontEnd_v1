import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/common-reset.css"; // Updated to use the unique CSS file

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenFromURL = params.get("token");
        if (!tokenFromURL) {
            setError("Invalid or missing reset token.");
        } else {
            setToken(tokenFromURL);
        }
    }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (!token) {
            setError("Reset token is missing.");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://classmanager-api.onrender.com/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password: formData.password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to reset password.");
            }

            const data = await response.json();
            setSuccess(data.message);
            setFormData({ password: "", confirmPassword: "" });
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Reset password error:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-header">
                <h1>Reset Your Password</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                    className="reset-password-input"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="reset-password-input"
                    required
                />
                {error && <p className="reset-password-error">{error}</p>}
                {success && <p className="reset-password-success">{success}</p>}
                <button type="submit" className="reset-password-submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;
