import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import JWT decode
import { useNavigate } from "react-router-dom";
import "../styles/AdminSummaryAnalytics.css";

const AdminSummaryAnalytics = () => {
    const [summaryData, setSummaryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; // Pagination rows per page
    const navigate = useNavigate();

    useEffect(() => {
        // Add a unique class to the body
        document.body.classList.add("admin-summary-analytics-body");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("admin-summary-analytics-body");
        };
    }, []);

    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const decodedToken = jwtDecode(token);
                    console.log("Decoded Token:", decodedToken); // Log token details
                }

                const response = await axios.get("http://127.0.0.1:8000/teacher/approved-lessons", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const lessons = response.data.approved_lessons;
                console.log("Approved Lessons:", lessons); // Log the lessons data

                // Aggregate data by teacher and education level
                const summary = lessons.reduce((acc, lesson) => {
                    const teacherName = lesson.teacher_name;
                    const educationLevel = lesson.education_level.trim(); // Trim whitespace
                    const hours = parseFloat(lesson.hours);

                    if (!acc[teacherName]) {
                        acc[teacherName] = {
                            ابتدائي: 0,
                            اعدادي: 0,
                            ثانوي: 0,
                        };
                    }

                    // Normalize level keys to match the aggregation
                    const normalizedLevel = educationLevel === "إعدادي" ? "اعدادي" : educationLevel;

                    if (acc[teacherName][normalizedLevel] !== undefined) {
                        acc[teacherName][normalizedLevel] += hours;
                    }

                    return acc;
                }, {});

                console.log("Aggregated Summary:", summary); // Log the aggregated summary

                const formattedData = Object.entries(summary).map(([teacherName, levels]) => ({
                    teacherName,
                    ابتدائي: levels.ابتدائي || 0,
                    اعدادي: levels.اعدادي || 0,
                    ثانوي: levels.ثانوي || 0,
                }));

                setSummaryData(formattedData);
            } catch (error) {
                console.error("Error fetching summary data:", error);
            }
        };

        fetchSummaryData();
    }, []);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = summaryData.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleBackToHome = () => {
        navigate("/HomepageAdmin"); // Replace "/HomepageAdmin" with your actual home page route
    };

    return (
        <div className="admin-summary-analytics-container">
            <h1 className="admin-summary-analytics-header">Summary / Analytics</h1>
            <div className="admin-summary-analytics-table-wrapper">
                <table className="admin-summary-analytics-table">
                    <thead>
                        <tr>
                            <th>Teacher Name</th>
                            <th>ابتدائي</th>
                            <th>اعدادي</th>
                            <th>ثانوي</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((data, index) => (
                            <tr key={index}>
                                <td>{data.teacherName}</td>
                                <td>{data.ابتدائي.toFixed(2)}</td>
                                <td>{data.اعدادي.toFixed(2)}</td>
                                <td>{data.ثانوي.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="admin-summary-analytics-pagination">
                {Array.from({ length: Math.ceil(summaryData.length / rowsPerPage) }).map(
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`admin-summary-analytics-page-button ${currentPage === index + 1 ? "active" : ""
                                }`}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
            <button
                onClick={handleBackToHome}
                className="admin-summary-analytics-back-button"
            >
                العودة إلى الصفحة الرئيسية
            </button>
        </div>
    );
};

export default AdminSummaryAnalytics;
