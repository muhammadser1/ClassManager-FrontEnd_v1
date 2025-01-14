import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AdminPendingLessons.css";

const AdminPendingLessons = () => {
    const [pendingLessons, setPendingLessons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        // Add a unique class to the body
        document.body.classList.add("admin-pending-lessons-body");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("admin-pending-lessons-body");
        };
    }, []);

    useEffect(() => {
        const fetchPendingLessons = async () => {
            try {
                const response = await axios.get("https://classmanager-api.onrender.com/teacher/pending-lessons");
                setPendingLessons(response.data.pending_lessons);
            } catch (error) {
                console.error("Error fetching lessons:", error);
            }
        };

        fetchPendingLessons();
    }, []);

    const filteredLessons = pendingLessons.filter((lesson) =>
        lesson.student_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredLessons.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleUpdateLesson = async (lessonId, status) => {
        const action = status === "approved" ? "approve" : "reject";
        const confirmAction = window.confirm(`Are you sure you want to ${action} this lesson?`);
        if (!confirmAction) return;

        try {
            const response = await axios.put(
                `https://classmanager-api.onrender.com/admin/update-lesson-status/${lessonId}`,
                null,
                { params: { status } }
            );
            alert(response.data.message || `Lesson ${action}d successfully!`);
            setPendingLessons((prevLessons) =>
                prevLessons.filter((lesson) => lesson.lesson_id !== lessonId)
            );
        } catch (error) {
            console.error(`Failed to ${action} lesson:`, error);
            alert(`Failed to ${action} the lesson. Please try again.`);
        }
    };

    const handleBackToDashboard = () => {
        navigate("/HomepageAdmin");
    };

    return (
        <div className="admin-pending-lessons-container">
            <h1 className="admin-pending-lessons-header">الدروس المعلقة</h1>
            <input
                type="text"
                placeholder="ابحث عن طريق اسم الطالب"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-pending-lessons-search-input"
            />
            <div className="admin-pending-lessons-table-wrapper">
                <table className="admin-pending-lessons-table">
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Education Level</th>
                            <th>Hours</th>
                            <th>Student Name</th>
                            <th>Teacher Name</th>
                            <th>Lesson ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((lesson, index) => (
                            <tr key={index}>
                                <td>
                                    <button
                                        onClick={() => handleUpdateLesson(lesson.lesson_id, "approved")}
                                        className="admin-pending-lessons-approve-button"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleUpdateLesson(lesson.lesson_id, "rejected")}
                                        className="admin-pending-lessons-reject-button"
                                    >
                                        Reject
                                    </button>
                                </td>
                                <td>{lesson.subject}</td>
                                <td>{new Date(lesson.date).toLocaleDateString()}</td>
                                <td>{lesson.education_level}</td>
                                <td>{lesson.hours}</td>
                                <td>{lesson.student_name}</td>
                                <td>{lesson.teacher_name}</td>
                                <td>{lesson.lesson_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            <div className="admin-pending-lessons-pagination">
                {Array.from({ length: Math.ceil(filteredLessons.length / rowsPerPage) }).map(
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`admin-pending-lessons-page-button ${currentPage === index + 1 ? "active" : ""
                                }`}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
            <button
                onClick={handleBackToDashboard}
                className="admin-pending-lessons-back-button"
            >
                العودة إلى الصفحة الرئيسية
            </button>
        </div>
    );
};

export default AdminPendingLessons;
