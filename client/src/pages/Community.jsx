import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Community.css";

function Community() {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showForm, setShowForm] = useState(false);

    const [posts, setPosts] = useState([
        {
            id: 1,
            name: "Rahul",
            category: "UPI Scam",
            title: "Someone asked me to scan a QR code to receive money",
            description:
                "I received a call from someone claiming that they wanted to send me money. They asked me to scan a QR code. Is this safe?",
            time: "2 hours ago",
            helpful: 12,
            comments: 4,
        },
        {
            id: 2,
            name: "Priya",
            category: "Phishing Link",
            title: "Received a suspicious bank SMS",
            description:
                "The message said my bank account would be blocked and asked me to click a link and update my KYC.",
            time: "5 hours ago",
            helpful: 24,
            comments: 8,
        },
        {
            id: 3,
            name: "Amit",
            category: "WhatsApp Scam",
            title: "Fake WhatsApp job offer",
            description:
                "Someone contacted me on WhatsApp offering a work-from-home job. They asked for an upfront registration fee.",
            time: "Yesterday",
            helpful: 18,
            comments: 6,
        },
    ]);

    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        category: "UPI Scam",
    });

    const categories = [
        "All",
        "UPI Scam",
        "Phishing Link",
        "WhatsApp Scam",
        "Fake Bank Call",
        "Fake Job",
        "Investment Scam",
        "Other",
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setNewPost({
            ...newPost,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!newPost.title.trim() || !newPost.description.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const post = {
            id: Date.now(),
            name: "You",
            category: newPost.category,
            title: newPost.title,
            description: newPost.description,
            time: "Just now",
            helpful: 0,
            comments: 0,
        };

        setPosts([post, ...posts]);

        setNewPost({
            title: "",
            description: "",
            category: "UPI Scam",
        });

        setShowForm(false);
    };

    const handleHelpful = (id) => {
        setPosts(
            posts.map((post) =>
                post.id === id
                    ? {
                          ...post,
                          helpful: post.helpful + 1,
                      }
                    : post
            )
        );
    };

    const filteredPosts =
        selectedCategory === "All"
            ? posts
            : posts.filter(
                  (post) => post.category === selectedCategory
              );

    return (
        <div className="community-page">

            {/* HEADER */}
            <div className="community-header">

                <div className="header-content">

                    <button
                        className="back-button"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Back to Dashboard
                    </button>

                    <h1>🛡️ Digital Saathi Community</h1>

                    <p>
                        Share experiences, report scams and help others
                        stay safe online.
                    </p>

                </div>

                <button
                    className="create-post-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    + Report a Scam
                </button>

            </div>

            {/* SAFETY WARNING */}
            <div className="safety-warning">

                <div className="warning-icon">
                    ⚠️
                </div>

                <div>
                    <h3>Stay Safe While Sharing</h3>

                    <p>
                        Never share your OTP, UPI PIN, password,
                        card number or other sensitive information.
                    </p>
                </div>

            </div>

            {/* CREATE POST FORM */}
            {showForm && (
                <div className="create-post-card">

                    <h2>🚨 Report a Digital Scam</h2>

                    <p>
                        Help the community by sharing your experience.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <label>
                            Scam Category
                        </label>

                        <select
                            name="category"
                            value={newPost.category}
                            onChange={handleInputChange}
                        >
                            {categories
                                .filter(
                                    (category) => category !== "All"
                                )
                                .map((category) => (
                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </option>
                                ))}
                        </select>

                        <label>
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={newPost.title}
                            onChange={handleInputChange}
                            placeholder="Example: I received a suspicious UPI request"
                        />

                        <label>
                            What happened?
                        </label>

                        <textarea
                            name="description"
                            value={newPost.description}
                            onChange={handleInputChange}
                            placeholder="Explain what happened. Do not share private information."
                            rows="5"
                        />

                        <div className="form-buttons">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="submit-button"
                            >
                                Submit Report
                            </button>

                        </div>

                    </form>

                </div>
            )}

            {/* CATEGORY FILTER */}
            <div className="category-section">

                <h2>Explore Scam Reports</h2>

                <div className="category-list">

                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                selectedCategory === category
                                    ? "category-button active"
                                    : "category-button"
                            }
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                        >
                            {category}
                        </button>
                    ))}

                </div>

            </div>

            {/* MAIN CONTENT */}
            <div className="community-layout">

                {/* FEED */}
                <div className="community-feed">

                    <div className="feed-title">

                        <h2>Community Reports</h2>

                        <span>
                            {filteredPosts.length} reports
                        </span>

                    </div>

                    {filteredPosts.length === 0 ? (

                        <div className="no-posts">

                            <div className="no-post-icon">
                                🔍
                            </div>

                            <h3>
                                No reports found
                            </h3>

                            <p>
                                There are no reports in this category yet.
                            </p>

                        </div>

                    ) : (

                        filteredPosts.map((post) => (

                            <div
                                className="post-card"
                                key={post.id}
                            >

                                {/* POST HEADER */}
                                <div className="post-header">

                                    <div className="user-info">

                                        <div className="user-avatar">
                                            {post.name.charAt(0)}
                                        </div>

                                        <div>
                                            <h3>
                                                {post.name}
                                            </h3>

                                            <span>
                                                {post.time}
                                            </span>
                                        </div>

                                    </div>

                                    <span className="post-category">
                                        {post.category}
                                    </span>

                                </div>

                                {/* POST CONTENT */}
                                <div className="post-content">

                                    <h2>
                                        {post.title}
                                    </h2>

                                    <p>
                                        {post.description}
                                    </p>

                                </div>

                                {/* POST ACTIONS */}
                                <div className="post-actions">

                                    <button
                                        onClick={() =>
                                            handleHelpful(post.id)
                                        }
                                    >
                                        👍 Helpful ({post.helpful})
                                    </button>

                                    <button>
                                        💬 Comments ({post.comments})
                                    </button>

                                    <button>
                                        ⚠️ Report
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* SIDEBAR */}
                <div className="community-sidebar">

                    <div className="sidebar-card">

                        <h2>
                            💡 Community Guidelines
                        </h2>

                        <ul>
                            <li>
                                Be respectful to other users.
                            </li>

                            <li>
                                Do not share personal information.
                            </li>

                            <li>
                                Never post OTPs or UPI PINs.
                            </li>

                            <li>
                                Do not share passwords or card details.
                            </li>

                            <li>
                                Verify information before sharing.
                            </li>

                            <li>
                                Report suspicious content.
                            </li>
                        </ul>

                    </div>

                    <div className="sidebar-card important-card">

                        <h2>
                            🚨 Remember
                        </h2>

                        <p>
                            Banks and legitimate organizations
                            will never ask you to share your OTP
                            or UPI PIN.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Community;