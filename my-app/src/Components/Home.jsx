import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import "../styles/home.css";

const Home = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically

    const goToLogin = () => {
        navigate('/login'); // Navigate to /login when the button is clicked
    };
    const goToSignup = () => {
        navigate('/signup'); // Navigate to /login when the button is clicked
    };
    return (
        <>
            {/* Header */}
            <header className="navbar">
                <div className="nav-left">
                    <img src="src/images/maram.png" alt="Logo" className="logo" />
                    <span className="institute-name">Al Maram</span>
                </div>
                <div className="nav-right">
                    <button className="auth-button" onClick={goToLogin}>Sign In</button> {/* Click to navigate to Login */}
                    <button className="auth-button" onClick={goToSignup}>Sign Up</button> {/* Click to navigate to Login */}

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
                    <div className="classroom-container">
                        <span className="classroom curved-text">Al Maram</span>
                    </div>                </div>

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

                    <a href="#suggestions">
                        <div className="grid-item color-4">
                            <div className="icon">
                                <img src="src/images/idea.png" alt="suggestions" />
                            </div>
                            <span>Suggestions</span>
                        </div>
                    </a>
                    <a href="#resources">
                        <div className="grid-item color-4">
                            <div className="icon">
                                <img src="src/images/class-resources-icon.png" alt="Class Resources Icon" />
                            </div>
                            <span>Class Resources</span>
                        </div>
                    </a>

                    <a href="#support">
                        <div className="grid-item color-1">
                            <div className="icon">
                                <img src="src/images/support-icon.png" alt="Support Icon" />
                            </div>
                            <span>Support</span>
                        </div>
                    </a>
                    <a href="#events">
                        <div className="grid-item color-2">
                            <div className="icon">
                                <img src="src/images/events-icon.png" alt="Events Icon" />
                            </div>
                            <span>Events</span>
                        </div>
                    </a>
                </div>

            </div>

            {/* Sections with Unique Classes */}
            <section id="reminders" className="reminders-section">
                <h2>Reminders</h2>
                {/* Two Square Boxes in the Reminders Section */}
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
                    <div className="rule-box">
                        Rule 1: Be respectful to others and their opinions.
                    </div>
                    <div className="rule-box">
                        Rule 2: Keep your workspace clean and organized.
                    </div>
                    <div className="rule-box">
                        Rule 3: Always ask questions when you're unsure.
                    </div>
                    <div className="rule-box">
                        Rule 4: Be on time for class and stay engaged.
                    </div>
                    <div className="rule-box">
                        Rule 5: Keep your devices on silent or vibrate during class.
                    </div>
                </div>
            </section>



            <section id="resources" className="resources-section">
                <h2>Class Resources</h2>
                <p>Access all the necessary resources for your class.</p>
            </section>


            <section id="support" className="support-section">
                <h2>Need Support?</h2>
                <p>If you are facing technical issues or have questions, feel free to reach out to me!</p>

                <div className="contact-box">
                    <form className="contact-form">
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            name="name"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            required
                            name="email"
                        />
                        <textarea
                            placeholder="Describe your issue..."
                            rows="4"
                            required
                            name="message"
                        ></textarea>
                        <button type="submit">Send Message</button>
                    </form>

                    <div className="contact-details">
                        <p>For immediate assistance, you can contact me directly:</p>
                        <p><strong>Phone:</strong> 0538250579</p>
                        <p><strong>Name:</strong> Mohammad Sarahni</p>
                    </div>
                </div>
            </section>
            <section id="suggestions" className="suggestions-section">
                <h2>We Value Your Suggestions</h2>
                <p>Share your ideas to help us improve and make your experience better.</p>

                <form>
                    <textarea
                        placeholder="What suggestions do you have for us?"
                        rows="5"
                        style={{
                            width: "50%", // Adjust the width
                            padding: "1rem",
                            borderRadius: "12px", // More rounded corners
                            borderColor: "#ccc",
                            marginBottom: "1rem",
                            fontSize: "1rem", // Optional: to make the text inside look more consistent
                        }}
                    />
                    <br />
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#C7BBE2",
                            color: "#fff",
                            padding: "1rem 2rem",
                            borderRadius: "8px",
                            marginTop: "1rem"
                        }}
                    >
                        Submit Suggestion
                    </button>
                </form>
            </section>

            <section id="events" className="events-section">
                <h2>Happy Birthday to Teacher 1</h2>
                <p>We wish you all the best on your special day! 🎉🎂</p>

                <div className="event-image">
                    <img
                        src="src/images/events-icon.png"
                        alt="Happy Birthday Balloons"
                        className="balloons-img"
                    />
                </div>

                <p>May this year bring you happiness, success, and many more celebrations!</p>
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
