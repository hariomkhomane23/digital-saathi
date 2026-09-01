import { useNavigate } from "react-router-dom";

function Learning() {
    const navigate = useNavigate();

    const tutorials = [
        {
            id: "phonepe",
            icon: "📱",
            title: "PhonePe",
            description:
                "Learn how to make payments, send money and use PhonePe safely."
        },
        {
            id: "google-pay",
            icon: "💳",
            title: "Google Pay",
            description:
                "Learn digital payments and important Google Pay safety practices."
        },
        {
            id: "whatsapp",
            icon: "💬",
            title: "WhatsApp",
            description:
                "Learn how to use WhatsApp safely and identify suspicious messages."
        },
        {
            id: "banking",
            icon: "🏦",
            title: "Banking",
            description:
                "Learn basic online banking and protect your financial information."
        },
        {
            id: "upi",
            icon: "🔐",
            title: "UPI",
            description:
                "Understand UPI payments, UPI PINs and common UPI scams."
        }
    ];

    return (
        <div className="learning-page">

            <header className="learning-header">
                <button
                    className="back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

                <h1>📚 Digital Learning</h1>

                <p>
                    Learn how to use digital services safely and confidently.
                </p>
            </header>

            <main className="learning-content">

                <div className="learning-intro">
                    <h2>Choose a Tutorial</h2>

                    <p>
                        Start with any topic and learn step-by-step.
                        Each tutorial includes important digital safety tips.
                    </p>
                </div>

                <div className="tutorial-grid">

                    {tutorials.map((tutorial) => (
                        <div
                            className="tutorial-card"
                            key={tutorial.id}
                            onClick={() =>
                                navigate(`/learning/${tutorial.id}`)
                            }
                        >
                            <div className="tutorial-icon">
                                {tutorial.icon}
                            </div>

                            <h3>{tutorial.title}</h3>

                            <p>{tutorial.description}</p>

                            <button>
                                Start Learning →
                            </button>
                        </div>
                    ))}

                </div>

            </main>

        </div>
    );
}

export default Learning;