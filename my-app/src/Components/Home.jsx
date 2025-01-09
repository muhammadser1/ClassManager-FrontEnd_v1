import React from "react";
import "../styles/home.css";

const Home = () => {
    return (
        <>
            {/* Header */}
            <header className="navbar">
                <div className="nav-left">
                    <img src="src/images/maram.png" alt="Logo" className="logo" />
                    <span className="institute-name">Al Maram</span>
                </div>
                <div className="nav-right">
                    <button className="auth-button">Sign In</button>
                    <button className="auth-button">Sign Up</button>
                </div>
            </header>

            {/* Left-Right Section */}
            <div className="home-container">
                {/* Left Section */}
                <div className="left-section">
                    <div className="title">
                        {/* Curved Text for LEARNING */}
                        <div className="classroom-container">
                            <span className="classroom curved-text">LEARNING</span>
                        </div>
                        {/* Curved Downward Text for ZONE */}
                        <div className="hub-container">
                            <span className="hub curved-down">ZONE</span>
                        </div>
                    </div>
                    <p className="subtitle">Al Maram</p>
                </div>

                {/* Right Section with Anchor Links */}
                <div className="right-section">
                    <a href="#reminders">
                        <div className="grid-item color-1">
                            <div className="icon">
                                <img src="src/images/reminders.png" alt="Reminders Icon" className="icon-img" />
                            </div>
                            <span>Reminders</span>
                        </div>
                    </a>
                    <a href="#policies">
                        <div className="grid-item color-2">
                            <div className="icon">
                                <img src="src/images/policies.png" alt="Classroom Policies Icon" />
                            </div>
                            <span>Classroom Policies</span>
                        </div>
                    </a>
                    <a href="#student">
                        <div className="grid-item color-3">
                            <div className="icon">
                                <img src="src/images/student-of-the-week.png" alt="Student of the Week Icon" />
                            </div>
                            <span>Student of the Week</span>
                        </div>
                    </a>
                    <a href="#teacher">
                        <div className="grid-item color-4">
                            <div className="icon">
                                <img src="src/images/teacher-of-the-week-icon.png" alt="Teacher of the Week Icon" />
                            </div>
                            <span>Teacher of the Week</span>
                        </div>
                    </a>
                    <a href="#resources">
                        <div className="grid-item color-1">
                            <div className="icon">
                                <img src="src/images/class-resources-icon.png" alt="Class Resources Icon" />
                            </div>
                            <span>Class Resources</span>
                        </div>
                    </a>
                    <a href="#teacherMeet">
                        <div className="grid-item color-2">
                            <div className="icon">
                                <img src="src/images/meet-the-teacher-icon.png" alt="Meet the Teacher Icon" />
                            </div>
                            <span>Meet the Teacher</span>
                        </div>
                    </a>
                    <a href="#support">
                        <div className="grid-item color-3">
                            <div className="icon">
                                <img src="src/images/support-icon.png" alt="Support Icon" />
                            </div>
                            <span>Support</span>
                        </div>
                    </a>
                    <a href="#events">
                        <div className="grid-item color-4">
                            <div className="icon">
                                <img src="src/images/events-icon.png" alt="Events Icon" />
                            </div>
                            <span>Events</span>
                        </div>
                    </a>
                </div>
            </div>

            {/* Sections with Unique Classes */}
            <section id="reminders" className="reminders-section" >
                <h2>Reminders</h2>
                <p>Here you can view all important reminders for your class.</p>
            </section>

            <section id="policies" className="policies-section">
                <h2>Classroom Policies</h2>
                <p>Check out the rules and policies for a successful learning experience.</p>
            </section>

            <section id="student" className="student-section">
                <h2>Student of the Week</h2>
                <p>Celebrate the outstanding student of the week.</p>
            </section>

            <section id="teacher" className="teacher-section">
                <h2>Teacher of the Week</h2>
                <p>Recognize the teacher of the week for their amazing contributions.</p>
            </section>

            <section id="resources" className="resources-section">
                <h2>Class Resources</h2>
                <p>Access all the necessary resources for your class.</p>
            </section>

            <section id="teacherMeet" className="teacherMeet-section">
                <h2>Meet the Teacher</h2>
                <p>Get to know your teacher and their teaching approach.</p>
            </section>

            <section id="support" className="support-section">
                <h2>Support</h2>
                <p>Need help? Find the resources to assist you.</p>
            </section>

            <section id="events" className="events-section">
                <h2>Upcoming Events</h2>
                <p>Stay tuned for exciting upcoming events and activities!</p>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>Contact us: info@myinstitute.com | +1 234 567 890</p>
                <p>Follow us on social media!</p>
            </footer>
        </>
    );
};

export default Home;
