import { useState } from "react";

function AISaathi() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();

        if (!message.trim() || loading) return;

        const userMessage = message;

        // Show user's message
        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
               `${import.meta.env.VITE_API_URL}/api/ai/chat`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: userMessage
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "AI request failed");
            }

            // Show AI response
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: data.reply
                }
            ]);

        } catch (error) {
            console.error("AI error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "Sorry, I couldn't connect to Digital Saathi."
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-container">

            <h1>🤖 AI Saathi</h1>

            <p>
                Your personal digital safety assistant
            </p>

            <div className="chat-box">

                {messages.length === 0 && (
                    <div className="ai-message">
                        Hello! I am your Digital Saathi. How can I help you?
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={
                            msg.sender === "user"
                                ? "user-message"
                                : "ai-message"
                        }
                    >
                        {msg.text}
                    </div>
                ))}

                {loading && (
                    <div className="ai-message">
                        AI Saathi is thinking...
                    </div>
                )}

            </div>

            <form onSubmit={handleSend}>

                <input
                    type="text"
                    placeholder="Ask AI Saathi something..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                </button>

            </form>

        </div>
    );
}

export default AISaathi;