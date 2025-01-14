import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import JWT decode
import { useNavigate } from "react-router-dom";
import "../styles/AdminStudentSummary.css";

const AdminStudentSummary = () => {
    const [summaryData, setSummaryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; // Pagination rows per page
    const navigate = useNavigate();

    useEffect(() => {
        // Add a unique class to the body
        document.body.classList.add("admin-student-summary-body");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("admin-student-summary-body");
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

                const response = await axios.get("https://classmanager-api.onrender.com/teacher/approved-lessons", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const lessons = response.data.approved_lessons;
                console.log("Approved Lessons:", lessons); // Log the lessons data

                // Aggregate data by student name
                const summary = lessons.reduce((acc, lesson) => {
                    const studentName = lesson.student_name;
                    const hours = parseFloat(lesson.hours);

                    if (!acc[studentName]) {
                        acc[studentName] = 0;
                    }

                    acc[studentName] += hours;

                    return acc;
                }, {});

                console.log("Aggregated Summary:", summary); // Log the aggregated summary

                const formattedData = Object.entries(summary).map(([studentName, hours]) => ({
                    studentName,
                    hours,
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
        <div className="admin-student-summary-container">
            <h1 className="admin-student-summary-header">Student Summary</h1>
            <div className="admin-student-summary-table-wrapper">
                <table className="admin-student-summary-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Total Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((data, index) => (
                            <tr key={index}>
                                <td>{data.studentName}</td>
                                <td>{data.hours.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="admin-student-summary-pagination">
                {Array.from({ length: Math.ceil(summaryData.length / rowsPerPage) }).map(
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`admin-student-summary-page-button ${currentPage === index + 1 ? "active" : ""
                                }`}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
            <button
                onClick={handleBackToHome}
                className="admin-student-summary-back-button"
            >
                العودة إلى الصفحة الرئيسية
            </button>
        </div>
    );
};

export default AdminStudentSummary;
