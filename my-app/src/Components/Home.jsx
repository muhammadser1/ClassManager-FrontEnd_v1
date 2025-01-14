import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/home.css";

const Home = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]); // Ensure events is initialized

    const [birthdays, setBirthdays] = useState([]);

    const goToLogin = () => {
        navigate('/login');
    };

    const goToSignup = () => {
        navigate('/signup');
    };

    // Fetch today's birthdays from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("https://classmanager-api.onrender.com/event/events");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched events data:", data);
                setEvents(data || []);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        const fetchBirthdays = async () => {
            try {
                const response = await fetch("https://classmanager-api.onrender.com/teacher/teachers-birthdays");
                const data = await response.json();
                console.log("Fetched data:", data);

                // Safely update birthdays state
                setBirthdays(data.birthday_teachers || []);
            } catch (error) {
                console.error("Error fetching birthdays:", error);
            }
        };
        fetchEvents();
        fetchBirthdays();
    }, []);


    return (
        <>
            {/* Header */}
            <header className="navbar">
                <div className="nav-left">
                    <img src="../images/maram.png" alt="Logo" className="logo" />
                    <span className="institute-name">Al Maram</span>
                </div>
                <div className="nav-right">
                    <button className="auth-button" onClick={goToLogin}>Sign In</button>
                    <button className="auth-button" onClick={goToSignup}>Sign Up</button>
                </div>
            </header>

            {/* Left-Right Section */}
            <div className="home-container">
                <div className="left-section">
                    <div className="title">
                        <div className="classroom-container">
                            <span className="classroom curved-text">LEARNING</span>
                        </div>
                        <div className="hub-container">
                            <span className="hub curved-down">ZONE</span>
                        </div>
                    </div>
                    <div className="classroom-container">
                        <span className="classroom curved-text">Al Maram</span>
                    </div>
                </div>

                <div className="right-section">
                    <a href="#reminders">
                        <div className="grid-item color-1">
                            <div className="icon">
                                <img src="../images/reminders.png" alt="Reminders Icon" className="icon-img" />
                            </div>
                            <span>Reminders</span>
                        </div>
                    </a>
                    <a href="#policies">
                        <div className="grid-item color-2">
                            <div className="icon">
                                <img src="../images/policies.png" alt="Classroom Policies Icon" />
                            </div>
                            <span>Classroom Policies</span>
                        </div>
                    </a>
                    <a href="#suggestions">
                        <div className="grid-item color-4">
                            <div className="icon">
                                <img src="../images/idea.png" alt="Suggestions Icon" />
                            </div>
                            <span>Suggestions</span>
                        </div>
                    </a>
                    <a href="#resources">
                        <div className="grid-item color-4">
                            <div className="icon">
                                <img src="../images/class-resources-icon.png" alt="Class Resources Icon" />
                            </div>
                            <span>Class Resources</span>
                        </div>
                    </a>
                    <a href="#schedule">
                        <div className="grid-item color-1">
                            <div className="icon">
                                <img src="../images/support-icon.png" alt="Support Icon" />
                            </div>
                            <span>Class Schedule</span>
                        </div>
                    </a>
                    <a href="#events">
                        <div className="grid-item color-2">
                            <div className="icon">
                                <img src="../images/events-icon.png" alt="Events Icon" />
                            </div>
                            <span>Events</span>
                        </div>
                    </a>
                </div>
            </div>

            {/* Sections */}
            <section id="reminders" className="reminders-section">
                <h2>Reminders</h2>
                <div className="reminder-boxes">
                    <div className="reminder-box color-1">
                        <h3>Reminder 1</h3>
                        <px>Don't forget to submit the lesson. Ensure all work is done and ready for review by the end of the day!</px>
                    </div>
                    <div className="reminder-box color-2">
                        <h3>Reminder 2</h3>
                        <px>If there are any notes or changes, please inform Maram or the parent as soon as possible. Communication is key!</px>
                    </div>
                </div>
            </section>

            <section id="policies" className="policies-section">
                <h2>Classroom Policies</h2>
                <div className="rules-list">
                    <div className="rule-box">Rule 1: Respect each other.</div>
                    <div className="rule-box">Rule 2: Be on time.</div>
                    <div className="rule-box">Rule 3: Keep your workspace clean.</div>
                    <div className="rule-box">Rule 4: Communicate issues promptly.</div>
                    <div className="rule-box">Rule 5: Be prepared for class.</div>
                </div>
            </section>

            <section id="resources" className="resources-section unique-resources">
                <h2 className="resources-heading">Class Resources</h2>
                <div className="resources-buttons">
                    <button className="resource-button resource-elementary" onClick={() => window.open("https://drive.google.com/drive/folders/1KkhksO7lZZLgCFnbOdeHj6LA5rzP7LNG?usp=sharing", "_blank")}>
                        ابتدائي
                    </button>
                    <button className="resource-button resource-middle" onClick={() => window.open("https://drive.google.com/folder2", "_blank")}>
                        اعدادي
                    </button>
                    <button className="resource-button resource-secondary" onClick={() => window.open("https://drive.google.com/folder3", "_blank")}>
                        ثانوي
                    </button>
                </div>
            </section>

            <section id="events" className="events-section">
                <h2>Today's Birthdays 🎉</h2>
                {birthdays && birthdays.length > 0 ? ( // Check if birthdays array is populated
                    <p>
                        🎂 Happy Birthday to {birthdays.map((teacher, index) => (
                            <strong key={index}>
                                {teacher.name}{index < birthdays.length - 1 ? ", " : ""}
                            </strong>
                        ))}!
                        We wish you a wonderful day filled with happiness and joy! 🎉🎂
                    </p>
                ) : (
                    <p>No birthdays today. 😊</p>
                )}
                <div className="event-image">
                    <img
                        src="src/images/events-icon.png"
                        alt="Happy Birthday Balloons"
                        className="balloons-img"
                    />
                </div>
            </section>

            <section id="schedule" className="schedule-section-unique-schedule">
                <h2 className="schedule-heading">Class Schedule and Upcoming Events</h2>
                <p className="schedule-description">Stay updated with our schedule and never miss an event!</p>
                <div className="schedule-event-list">
                    <ul className="schedule-events">
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <li className="schedule-event" key={index}>
                                    <strong className="event-title">{event.title}:</strong>
                                    <span className="event-date">
                                        {new Date(event.date).toLocaleString()} ({event.hours} hours)
                                    </span>
                                </li>
                            ))
                        ) : (
                            <p>No upcoming events.</p>
                        )}
                    </ul>
                </div>
            </section>




            <section id="suggestions" className="suggestions-section">

            </section>


            <footer className="footer">
                <p>Contact us: info@myinstitute.com | +1 234 567 890</p>
                <p>Follow us on social media!</p>
            </footer>
        </>
    );
};

export default Home;
