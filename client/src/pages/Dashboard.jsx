import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="dashboard">

            {/* Header */}
            <header className="dashboard-header">

                <h1>Digital Saathi</h1>

                <div>
                    <span>
                        👋 {user?.name || "User"}
                    </span>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>

            </header>


            {/* Main content */}
            <main className="dashboard-content">

                <h2>
                    Welcome, {user?.name || "User"} 👋
                </h2>

                <p>
                    Your digital companion for learning,
                    opportunities and everyday assistance.
                </p>


                {/* Feature Cards */}
                <div className="feature-grid">

                    <div
                        className="feature-card"
                        onClick={() => navigate("/ai-saathi")}
                    >
                        <h3>🤖 AI Saathi</h3>
                        <p>
                            Ask questions and get AI-powered
                            assistance.
                        </p>
                    </div>


                    <div
                        className="feature-card"
                        onClick={() => navigate("/learning")}
                    >
                        <h3>📚 Learning</h3>
                        <p>
                            Learn new skills and improve your
                            knowledge.
                        </p>
                    </div>


                    <div
                        className="feature-card"
                        onClick={() => navigate("/schemes")}
                    >
                        <h3>🏛 Schemes</h3>
                        <p>
                            Discover useful government schemes
                            and benefits.
                        </p>
                    </div>

                    <div
    className="feature-card"
    onClick={() => navigate("/community")}
>
    <div className="feature-icon">
        🛡️
    </div>

    <h3>
        Community
    </h3>

    <p>
        Share scam experiences and learn from other users.
    </p>
</div>

<div
    className="feature-card"
    onClick={() => navigate("/url-checker")}
>
    <div className="feature-icon">
        🔎
    </div>

    <h3>
        Scam Link Checker
    </h3>

    <p>
        Check suspicious links before opening them.
    </p>
</div>

<div
    className="feature-card"
    onClick={() => navigate("/scam-detector")}
>
    <h3>🛡️ Scam Detector</h3>
    <p>
        Check suspicious messages and identify possible scams.
    </p>
</div>


                    <div
                        className="feature-card"
                        onClick={() => navigate("/careers")}
                    >
                        <h3>💼 Careers</h3>
                        <p>
                            Explore career and job opportunities.
                        </p>
                    </div>

                </div>

 

            </main>

        </div>

        
    );
}

export default Dashboard;