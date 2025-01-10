import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../styles/UserLessons.css";

const UserLessons = () => {
    const [approvedLessons, setApprovedLessons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const navigate = useNavigate();

    // Array of positive Arabic thank-you sentences
    const thankYouMessages = [
        ".شكراً لك. نقدر جهودك الطيبة",
        ".عملك الرائع يُحدث فرقاً",
        ".نشكرك على عطائك المستمر",
        ".جهودك المميزة محل تقدير كبير",
        ".عملك الدؤوب محل احترامنا",
        ".شكراً لوقتك وجهودك",
        ".نقدر تفانيك وإخلاصك",
        ".أنت مصدر إلهام لنا جميعاً",
        ".شكراً على عطائك السخي",
        ".جهودك تعني الكثير لنا",
        ".شكراً لك على التفاني في العمل",
        ".عملك المثابر يجعلنا فخورين بك",
        ".نشكرك على تحملك المسؤولية بكفاءة",
        ".نقدر دعمك وجهودك التي لا تنتهي",
        ".إبداعك يُثري مجتمعنا",
        ".شكراً لروحك الإيجابية وتعاونك",
        ".أنت مثال يحتذى به في التفاني والإخلاص",
        ".عملك المتقن يلهمنا جميعاً",
        ".جهودك تُحدث فرقاً حقيقياً في حياتنا",
        ".شكراً لإسهاماتك التي لا تُقدر بثمن"
    ];


    // Fetch teacher name from token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const teacherName = decodedToken.username;
                fetchApprovedLessons(teacherName);
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

    const fetchApprovedLessons = async (teacherName) => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/teacher/approved-lessons", {
                params: { teacher_name: teacherName },
            });
            setApprovedLessons(response.data.approved_lessons || []);
        } catch (error) {
            console.error("Error fetching approved lessons:", error);
            alert("Failed to fetch approved lessons. Please try again.");
        }
    };

    // Search and pagination
    const filteredLessons = approvedLessons.filter((lesson) =>
        lesson.student_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredLessons.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleBackToHome = () => {
        navigate("/homepage");
    };

    return (
        <div className="user-lessons-container">
            <h1>الدروس الموافق عليها</h1>
            <input
                type="text"
                placeholder="ابحث عن طريق اسم الطالب"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="table-wrapper">
                <table className="user-lessons-table">
                    <thead>
                        <tr>
                            <th>التاريخ</th>
                            <th>اسم الطالب</th>
                            <th>عدد الساعات</th>
                            <th>المستوى التعليمي</th>
                            <th>الموضوع</th>
                            <th></th> {/* Column for the thank-you message */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((lesson) => (
                            <tr key={lesson.lesson_id}>
                                <td>{new Date(lesson.date).toLocaleDateString()}</td>
                                <td>{lesson.student_name}</td>
                                <td>{lesson.hours}</td>
                                <td>{lesson.education_level}</td>
                                <td>{lesson.subject}</td>
                                <td>
                                    {
                                        thankYouMessages[
                                        Math.floor(Math.random() * thankYouMessages.length)
                                        ]
                                    }
                                </td>
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

export default UserLessons;
