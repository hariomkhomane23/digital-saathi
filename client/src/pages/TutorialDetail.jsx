import { useNavigate, useParams } from "react-router-dom";

const tutorials = {
    phonepe: {
        icon: "📱",
        title: "PhonePe",
        description: "Learn how to use PhonePe safely.",
        steps: [
            "Open the official PhonePe application.",
            "Make sure the recipient's name is correct before sending money.",
            "Enter the amount you want to send.",
            "Check the payment details carefully.",
            "Enter your UPI PIN only when you are making a payment.",
            "Wait for the payment confirmation."
        ],
        safety: [
            "Never share your UPI PIN.",
            "Never share your OTP.",
            "You do not need a UPI PIN to receive money.",
            "Do not allow strangers to control your phone remotely."
        ]
    },

    "google-pay": {
        icon: "💳",
        title: "Google Pay",
        description: "Learn digital payments safely using Google Pay.",
        steps: [
            "Open the official Google Pay application.",
            "Select the person or service you want to pay.",
            "Verify the recipient's name and payment details.",
            "Enter the amount.",
            "Confirm the transaction.",
            "Enter your UPI PIN to authorize the payment."
        ],
        safety: [
            "Never share your UPI PIN or OTP.",
            "Always verify the recipient before paying.",
            "Do not accept unknown payment requests.",
            "Avoid suspicious links claiming to be payment links."
        ]
    },

    whatsapp: {
        icon: "💬",
        title: "WhatsApp",
        description: "Learn how to use WhatsApp safely.",
        steps: [
            "Open WhatsApp and verify your contacts.",
            "Send messages only to people you recognize.",
            "Check links before opening them.",
            "Use WhatsApp privacy settings.",
            "Enable two-step verification.",
            "Report suspicious accounts or messages."
        ],
        safety: [
            "Never share an OTP received on your phone.",
            "Do not click suspicious links.",
            "Be careful with unknown job or prize messages.",
            "Never send money to an unknown person."
        ]
    },

    banking: {
        icon: "🏦",
        title: "Online Banking",
        description: "Learn basic online banking safety.",
        steps: [
            "Use your bank's official application or website.",
            "Log in using your credentials.",
            "Check the website address before entering information.",
            "Never save your banking password on public computers.",
            "Log out after completing your banking session.",
            "Check your account notifications regularly."
        ],
        safety: [
            "Never share your banking password.",
            "Never share your OTP, ATM PIN or CVV.",
            "Do not click unknown banking links.",
            "Contact your bank through its official customer-care channel."
        ]
    },

    upi: {
        icon: "🔐",
        title: "UPI",
        description: "Understand UPI payments and stay safe.",
        steps: [
            "Open a trusted UPI application.",
            "Select the person or merchant you want to pay.",
            "Verify the recipient's name.",
            "Enter the amount.",
            "Review the transaction.",
            "Enter your UPI PIN to authorize the payment."
        ],
        safety: [
            "Your UPI PIN is confidential.",
            "You do not need a UPI PIN to receive money.",
            "Never share your OTP.",
            "Do not scan an unknown QR code just because someone asks you to.",
            "Always verify the recipient before making a payment."
        ]
    }
};

function TutorialDetail() {
    const { topic } = useParams();
    const navigate = useNavigate();

    const tutorial = tutorials[topic];

    if (!tutorial) {
        return (
            <div className="tutorial-detail">
                <h2>Tutorial not found</h2>

                <button onClick={() => navigate("/learning")}>
                    ← Back to Learning
                </button>
            </div>
        );
    }

    return (
        <div className="tutorial-detail">

            <header className="tutorial-detail-header">

                <button
                    className="back-button"
                    onClick={() => navigate("/learning")}
                >
                    ← Back to Learning
                </button>

                <div className="tutorial-title">
                    <span>{tutorial.icon}</span>

                    <div>
                        <h1>{tutorial.title}</h1>
                        <p>{tutorial.description}</p>
                    </div>
                </div>

            </header>

            <main className="tutorial-detail-content">

                {/* Steps */}

                <section className="tutorial-section">

                    <h2>📖 Step-by-Step Guide</h2>

                    <div className="steps-list">

                        {tutorial.steps.map((step, index) => (
                            <div
                                className="step"
                                key={index}
                            >
                                <div className="step-number">
                                    {index + 1}
                                </div>

                                <p>{step}</p>
                            </div>
                        ))}

                    </div>

                </section>

                {/* Safety */}

                <section className="safety-section">

                    <h2>⚠️ Safety Tips</h2>

                    <ul>
                        {tutorial.safety.map((tip, index) => (
                            <li key={index}>
                                {tip}
                            </li>
                        ))}
                    </ul>

                </section>

                {topic === "phonepe" && (
    <button
        className="simulator-button"
        onClick={() =>
            navigate("/learning/phonepe/simulator")
        }
    >
        📱 Practice PhonePe
    </button>
)}

<button
    className="complete-button"
    onClick={() => alert("Tutorial completed!")}
>
    ✓ Mark as Complete
</button>
                

            </main>

        </div>
    );
}

export default TutorialDetail;