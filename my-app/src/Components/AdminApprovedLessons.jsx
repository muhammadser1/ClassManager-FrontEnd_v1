import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AdminApprovedLessons.css";

const AdminApprovedLessons = () => {
    const [approvedLessons, setApprovedLessons] = useState([]);
    const [searchStudentName, setSearchStudentName] = useState(""); // Filter by student name
    const [searchTeacherName, setSearchTeacherName] = useState(""); // Filter by teacher name
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const navigate = useNavigate(); // To navigate to other pages

    useEffect(() => {
        // Add a unique class to the body
        document.body.classList.add("admin-approved-lessons-body");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("admin-approved-lessons-body");
        };
    }, []);

    useEffect(() => {
        const fetchApprovedLessons = async () => {
            try {
                const response = await axios.get("https://classmanager-api.onrender.com/teacher/approved-lessons");
                setApprovedLessons(response.data.approved_lessons);
            } catch (error) {
                console.error("Error fetching lessons:", error);
            }
        };

        fetchApprovedLessons();
    }, []);

    // Filter lessons by both student name and teacher name
    const filteredLessons = approvedLessons.filter(
        (lesson) =>
            lesson.student_name.toLowerCase().includes(searchStudentName.toLowerCase()) &&
            lesson.teacher_name.toLowerCase().includes(searchTeacherName.toLowerCase())
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredLessons.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleBackToHome = () => {
        navigate("/HomepageAdmin"); // Replace "/home" with the correct path for your home page
    };

    return (
        <div className="admin-approved-lessons-container">
            <h1 className="admin-approved-lessons-header">الدروس المعتمدة</h1>
            <div className="admin-approved-lessons-search-wrapper">
                <input
                    type="text"
                    placeholder="ابحث عن طريق اسم الطالب"
                    value={searchStudentName}
                    onChange={(e) => setSearchStudentName(e.target.value)}
                    className="admin-approved-lessons-search-input"
                />
                <input
                    type="text"
                    placeholder="ابحث عن طريق اسم المعلم"
                    value={searchTeacherName}
                    onChange={(e) => setSearchTeacherName(e.target.value)}
                    className="admin-approved-lessons-search-input"
                />
            </div>
            <div className="admin-approved-lessons-table-wrapper">
                <table className="admin-approved-lessons-table">
                    <thead>
                        <tr>
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
            <div className="admin-approved-lessons-pagination">
                {Array.from({ length: Math.ceil(filteredLessons.length / rowsPerPage) }).map(
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`admin-approved-lessons-page-button ${currentPage === index + 1 ? "active" : ""
                                }`}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
            <button
                onClick={handleBackToHome}
                className="admin-approved-lessons-back-button"
            >
                العودة إلى الصفحة الرئيسية
            </button>
        </div>
    );
};

export default AdminApprovedLessons;
