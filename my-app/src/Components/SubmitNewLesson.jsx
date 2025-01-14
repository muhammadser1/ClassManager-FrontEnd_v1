import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/SubmitNewLesson.css";

function SubmitLesson() {
    const [username, setUsername] = useState("");
    const [studentName, setStudentName] = useState("");
    const [hours, setHours] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [subject, setSubject] = useState("");
    const [date, setDate] = useState(""); // Auto-populated date
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Track loading state
    const [message, setMessage] = useState(""); // Feedback message
    const navigate = useNavigate();

    // Map Arabic time options to their numeric equivalents
    const hoursMapping = {
        "ساعة": 1,
        "ساعة وربع": 1.25,
        "ساعة ونصف": 1.5,
        "ساعة وثلاثة أرباع": 1.75,
        "ساعتين": 2,
        "ساعتين وربع": 2.25,
        "ساعتين ونصف": 2.5,
        "ساعتين وثلاثة أرباع": 2.75,
        "ثلاث ساعات": 3,
    };

    // Decode token to fetch teacher's name
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found in localStorage.");
            setError("يجب تسجيل الدخول للوصول إلى هذه الصفحة.");
            navigate("/login");
            return;
        }

        try {
            console.log("Token found:", token); // Debug log
            const decodedToken = jwtDecode(token); // Decode the token
            console.log("Decoded Token:", decodedToken); // Debug log
            if (decodedToken && decodedToken.username) {
                setUsername(decodedToken.username); // Set the teacher's name
            } else {
                console.error("Username not found in token.");
                setError("رمز المصادقة غير صالح أو منتهي الصلاحية.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error decoding token:", error.message); // Debug log
            setError("رمز المصادقة غير صالح أو منتهي الصلاحية.");
            navigate("/login");
        }

        // Set today's date as the default value for the date field
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validate form inputs
        if (!studentName || !hours || !educationLevel || !subject || !date) {
            setLoading(false);
            setError("جميع الحقول مطلوبة.");
            return;
        }

        // Convert Arabic time input into numeric format
        const numericHours = hoursMapping[hours];
        if (!numericHours) {
            setLoading(false);
            setError("يرجى اختيار عدد ساعات صالح.");
            return;
        }

        // Prepare payload
        const lessonData = {
            teacher_name: username,
            student_name: studentName,
            hours: numericHours, // Use the converted numeric value
            education_level: educationLevel,
            subject,
            date, // Ensure the format is YYYY-MM-DD
        };

        console.log("Submitting payload:", lessonData); // Debug: Log the payload

        try {
            const response = await fetch("https://classmanager-api.onrender.com/teacher/submit-lesson", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(lessonData),
            });

            console.log("Server response status:", response.status); // Debug log

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Server error:", errorData); // Debug log
                throw new Error(errorData.detail || "فشل في إرسال الدرس.");
            }

            const data = await response.json();
            console.log("Server response data:", data); // Debug log
            setMessage("تم إرسال الدرس بنجاح!"); // Show success message
            navigate("/homepage"); // Redirect after submission
        } catch (error) {
            console.error("Error submitting lesson:", error); // Debug log
            setError(error.message || "حدث خطأ أثناء إرسال الدرس.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate("/homepage"); // Navigate to homepage
    };

    return (
        <div className="new_lesson_body" dir="rtl">
            <div className="new_lesson_container">
                <header className="new_lesson_header">
                    <h1>إرسال درس جديد</h1>
                    <p>املأ التفاصيل أدناه لإرسال درس جديد</p>
                </header>

                <form className="new_lesson_form" onSubmit={handleSubmit}>
                    <div className="new_lesson_field">
                        <label htmlFor="teacherName">اسم المعلم</label>
                        <input
                            type="text"
                            id="teacherName"
                            value={username}
                            disabled
                            aria-readonly="true"
                            required
                        />
                    </div>

                    <div className="new_lesson_field">
                        <label htmlFor="studentName">اسم الطالب</label>
                        <input
                            type="text"
                            id="studentName"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="أدخل اسم الطالب"
                            required
                        />
                    </div>

                    <div className="new_lesson_field">
                        <label htmlFor="hours">عدد الساعات</label>
                        <select
                            id="hours"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            required
                        >
                            <option value="">اختر عدد الساعات</option>
                            {Object.keys(hoursMapping).map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="new_lesson_field">
                        <label htmlFor="educationLevel">المستوى التعليمي</label>
                        <select
                            id="educationLevel"
                            value={educationLevel}
                            onChange={(e) => setEducationLevel(e.target.value)}
                            required
                        >
                            <option value="">اختر المستوى التعليمي</option>
                            <option value="ابتدائي">ابتدائي</option>
                            <option value="اعدادي">اعدادي</option>
                            <option value="ثانوي">ثانوي</option>
                        </select>
                    </div>


                    <div className="new_lesson_field">
                        <label htmlFor="subject">الموضوع</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="أدخل موضوع الدرس"
                            required
                        />
                    </div>

                    <div className="new_lesson_field">
                        <label htmlFor="date">التاريخ</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            required
                        />
                    </div>

                    {error && <p className="error">{error}</p>}
                    {message && <p className="success">{message}</p>}

                    <button className="new_lesson_submit_button" type="submit" disabled={loading}>
                        {loading ? "جاري الإرسال..." : "إرسال"}
                    </button>
                </form>

                <button className="new_lesson_back_button" onClick={handleGoBack}>
                    العودة إلى الصفحة الرئيسية
                </button>
            </div>
        </div>
    );
}

export default SubmitLesson;
