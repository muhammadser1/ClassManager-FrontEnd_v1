import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/AdminAddEvent.css";

const AdminAddEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        teacher: "",
        date: "",
        hours: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized: Please log in.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.role !== "admin") {
                setError("Access Denied: Admins only.");
                return;
            }
            if (decodedToken.exp * 1000 < Date.now()) {
                setError("Session expired. Please log in again.");
                return;
            }

            const response = await fetch("https://classmanager-api.onrender.com/admin/add-event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to add event.");
            }

            setSuccess("Event added successfully!");
            setFormData({ title: "", teacher: "", date: "", hours: "" });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleBackToHome = () => {
        navigate("/HomepageAdmin"); // Navigate back to admin dashboard
    };

    return (
        <div className="admin-add-event-container">
            <div className="admin-add-event-form-wrapper">
                <h1>Add Event</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="admin-add-event-input"
                        required
                    />
                    <input
                        type="text"
                        name="teacher"
                        placeholder="Teacher Name"
                        value={formData.teacher}
                        onChange={handleChange}
                        className="admin-add-event-input"
                        required
                    />
                    <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="admin-add-event-input"
                        required
                    />
                    <input
                        type="number"
                        name="hours"
                        placeholder="Hours"
                        value={formData.hours}
                        onChange={handleChange}
                        className="admin-add-event-input"
                        required
                    />
                    {error && <p className="admin-add-event-error">{error}</p>}
                    {success && <p className="admin-add-event-success">{success}</p>}
                    <button type="submit" className="admin-add-event-submit-button">
                        Add Event
                    </button>
                </form>
                <button
                    className="admin-add-event-back-button"
                    onClick={handleBackToHome}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default AdminAddEvent;
