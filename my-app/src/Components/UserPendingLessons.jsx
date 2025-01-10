import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../styles/UserPendingLessons.css";

const UserPendingLessons = () => {
    const [pendingLessons, setPendingLessons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [originalData, setOriginalData] = useState({});
    const [teacherName, setTeacherName] = useState("");
    const rowsPerPage = 10;
    const navigate = useNavigate();

    // Fetch teacher name from token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setTeacherName(decodedToken.username);
            } catch (error) {
                console.error("Failed to decode token:", error);
                alert("Invalid or expired token. Please log in again.");
                navigate("/login");
            }
        } else {
            alert("No token found. Please log in.");
            navigate("/login");
        }
    }, [navigate]);

    // Fetch pending lessons
    useEffect(() => {
        const fetchPendingLessons = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/teacher/pending-lessons", {
                    params: { teacher_name: teacherName },
                });
                const lessons = response.data.pending_lessons.map((lesson) => ({
                    ...lesson,
                    isEditing: false,
                }));
                setPendingLessons(lessons);

                // Save the original data for cancel functionality
                const initialData = {};
                lessons.forEach((lesson) => {
                    initialData[lesson.lesson_id] = { ...lesson };
                });
                setOriginalData(initialData);
            } catch (error) {
                console.error("Error fetching lessons:", error);
            }
        };

        if (teacherName) {
            fetchPendingLessons();
        }
    }, [teacherName]);

    // Search and pagination
    const filteredLessons = pendingLessons.filter((lesson) =>
        lesson.student_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredLessons.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Editing functionality
    const handleEditToggle = (lessonId) => {
        setPendingLessons((prevLessons) =>
            prevLessons.map((lesson) =>
                lesson.lesson_id === lessonId
                    ? { ...lesson, isEditing: !lesson.isEditing }
                    : lesson
            )
        );
    };

    const handleInputChange = (lessonId, field, value) => {
        setPendingLessons((prevLessons) =>
            prevLessons.map((lesson) =>
                lesson.lesson_id === lessonId ? { ...lesson, [field]: value } : lesson
            )
        );
    };

    const handleSave = async (lessonId) => {
        const lessonToSave = pendingLessons.find((lesson) => lesson.lesson_id === lessonId);
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/teacher/edit-lesson/${lessonId}`,
                lessonToSave, // Lesson data sent in the body
                {
                    params: { teacher_name: teacherName }, // Query parameter
                }
            );
            alert(response.data.message || "Lesson updated successfully!");
            handleEditToggle(lessonId); // Exit edit mode
        } catch (error) {
            console.error("Failed to save lesson:", error);
            alert("Failed to save the lesson. Please try again.");
        }
    };

    const handleCancel = (lessonId) => {
        setPendingLessons((prevLessons) =>
            prevLessons.map((lesson) =>
                lesson.lesson_id === lessonId ? { ...originalData[lesson.lesson_id], isEditing: false } : lesson
            )
        );
    };

    // Deleting a lesson
    const handleDelete = async (lessonId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this lesson?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/teacher/delete-lesson/${lessonId}`,
                {
                    params: { teacher_name: teacherName },
                }
            );
            alert(response.data.message || "Lesson deleted successfully!");
            setPendingLessons((prevLessons) =>
                prevLessons.filter((lesson) => lesson.lesson_id !== lessonId)
            );
        } catch (error) {
            console.error("Failed to delete lesson:", error);
            alert("Failed to delete the lesson. Please try again.");
        }
    };
    const handleBackToHome = () => {
        navigate("/homepage");
    };

    return (
        <div className="pending-lessons-container">
            <h1>الدروس المعلقة</h1>
            <input
                type="text"
                placeholder="ابحث عن طريق اسم الطالب"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="table-wrapper">
                <table className="pending-lessons-table">
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>Subject</th>
                            <th>Education Level</th>
                            <th>Date</th>
                            <th>Hours</th>
                            <th>Student Name</th>
                            <th>Teacher Name</th>
                            <th>Lesson ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((lesson) => (
                            <tr key={lesson.lesson_id}>
                                {/* Actions */}
                                <td>
                                    {lesson.isEditing ? (
                                        <>
                                            <button
                                                className="action-button save-button"
                                                onClick={() => handleSave(lesson.lesson_id)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="action-button cancel-button"
                                                onClick={() => handleCancel(lesson.lesson_id)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="action-button edit-button"
                                            onClick={() => handleEditToggle(lesson.lesson_id)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="action-button delete-button"
                                        onClick={() => handleDelete(lesson.lesson_id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                                {/* Subject */}
                                <td>
                                    {lesson.isEditing ? (
                                        <input
                                            type="text"
                                            value={lesson.subject}
                                            onChange={(e) =>
                                                handleInputChange(lesson.lesson_id, "subject", e.target.value)
                                            }
                                        />
                                    ) : (
                                        lesson.subject
                                    )}
                                </td>

                                {/* Education Level */}
                                <td>
                                    {lesson.isEditing ? (
                                        <input
                                            type="text"
                                            value={lesson.education_level}
                                            onChange={(e) =>
                                                handleInputChange(lesson.lesson_id, "education_level", e.target.value)
                                            }
                                        />
                                    ) : (
                                        lesson.education_level
                                    )}
                                </td>

                                {/* Date */}
                                <td>
                                    {lesson.isEditing ? (
                                        <input
                                            type="date"
                                            value={lesson.date}
                                            onChange={(e) =>
                                                handleInputChange(lesson.lesson_id, "date", e.target.value)
                                            }
                                        />
                                    ) : (
                                        new Date(lesson.date).toLocaleDateString()
                                    )}
                                </td>

                                {/* Hours */}
                                <td>
                                    {lesson.isEditing ? (
                                        <input
                                            type="number"
                                            value={lesson.hours}
                                            onChange={(e) =>
                                                handleInputChange(lesson.lesson_id, "hours", e.target.value)
                                            }
                                        />
                                    ) : (
                                        lesson.hours
                                    )}
                                </td>

                                {/* Student Name */}
                                <td>
                                    {lesson.isEditing ? (
                                        <input
                                            type="text"
                                            value={lesson.student_name}
                                            onChange={(e) =>
                                                handleInputChange(lesson.lesson_id, "student_name", e.target.value)
                                            }
                                        />
                                    ) : (
                                        lesson.student_name
                                    )}
                                </td>

                                {/* Teacher Name */}
                                <td>{lesson.teacher_name}</td>

                                {/* Lesson ID */}
                                <td>{lesson.lesson_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredLessons.length / rowsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button className="back-to-home-button" onClick={handleBackToHome}>
                العودة إلى الصفحة الرئيسية
            </button>
        </div>
    );
};

export default UserPendingLessons;
