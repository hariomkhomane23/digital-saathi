import { useState } from "react";
import axios from "axios";
import "./ScamDetector.css";

// Sample messages for quick testing
const SAMPLE_MESSAGES = [
    {
        label: "🚨 Banking KYC Scam",
        text: "URGENT: Your SBI account has been suspended! Update your KYC immediately by clicking http://sbi-update-kyc.top or your account will be blocked within 2 hours."
    },
    {
        label: "🎁 Lottery Trap",
        text: "Congratulations! You have won a cash prize of ₹5,00,000 from Kaun Banega Crorepati. Claim your prize now by sending a processing fee of ₹1,000 via UPI."
    },
    {
        label: "✅ Safe Message",
        text: "Hi Mom, I reached the hostel safely. Will call you evening around 7 PM after class."
    }
];

function ScamDetector() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isFallback, setIsFallback] = useState(false);

    // Fallback local heuristic analyzer when backend is offline
    const runLocalAnalysis = (message) => {
        const lowerMsg = message.toLowerCase();
        const warnings = [];
        const advice = [];
        let score = 10; // Base safe score

        // Check for urgency
        if (/urgent|immediately|blocked|suspended|expires today|within \d+ (hours|mins)/i.test(lowerMsg)) {
            score += 30;
            warnings.push("Creates artificial urgency or pressure to act fast.");
        }

        // Check for links
        if (/https?:\/\/|[a-z0-9-]+\.(top|xyz|link|site|info|apk)/i.test(lowerMsg)) {
            score += 25;
            warnings.push("Contains suspicious external link or unconventional URL domain.");
        }

        // Check for financial requests / prizes
        if (/won|lottery|cash prize|free gift|claim|reward|processing fee/i.test(lowerMsg)) {
            score += 25;
            warnings.push("Promises unexpected rewards, prizes, or requests fee to claim money.");
        }

        // Check for credentials / OTP / PIN
        if (/otp|pin|password|cvv|bank details|card number|aadhaar|kyc/i.test(lowerMsg)) {
            score += 30;
            warnings.push("Requests confidential personal, banking, or credential information.");
        }

        score = Math.min(score, 99);

        let riskLevel = "LOW RISK";
        if (score >= 70) {
            riskLevel = "HIGH RISK";
            advice.push("Do not click any links or download attachments.");
            advice.push("Do not share OTPs, passwords, or personal identity numbers.");
            advice.push("Report and block the sender immediately.");
        } else if (score >= 40) {
            riskLevel = "MEDIUM RISK";
            advice.push("Verify the sender's details through official channels before responding.");
            advice.push("Never transfer money or pay fees to claim prizes.");
        } else {
            advice.push("This message appears generally safe, but always verify unexpected requests.");
        }

        return {
            riskLevel,
            riskScore: score,
            warnings,
            advice
        };
    };

    const analyzeMessage = async () => {
        if (!text.trim()) {
            setError("Please enter or paste a message to analyze.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);
        setIsFallback(false);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/scam/analyze`,
                { text: text },
                { timeout: 3500 } // 3.5s timeout before trying fallback
            );

            setResult(response.data);
        } catch (err) {
            console.warn("Backend server not reached. Operating in offline/client-side fallback mode.");
            
            // Client-side local analysis fallback
            const fallbackResult = runLocalAnalysis(text);
            setResult(fallbackResult);
            setIsFallback(true);
        } finally {
            setLoading(false);
        }
    };

    const clearAll = () => {
        setText("");
        setResult(null);
        setError("");
        setIsFallback(false);
    };

    const loadSample = (sampleText) => {
        setText(sampleText);
        setError("");
        setResult(null);
    };

    const getRiskClass = () => {
        if (!result) return "";
        if (result.riskScore >= 70) return "high-risk";
        if (result.riskScore >= 40) return "medium-risk";
        return "low-risk";
    };

    return (
        <div className="scam-page">
            {/* Header */}
            <div className="scam-header">
                <div className="shield-icon">🛡️</div>
                <h1>AI Scam Detector</h1>
                <p>Check suspicious messages before you click, pay, or share personal information.</p>
            </div>

            {/* Main Input Card */}
            <div className="scam-card">
                <div className="card-title">
                    <h2>🔍 Analyze a Suspicious Message</h2>
                    <p>Paste an SMS, WhatsApp message, email, or suspicious text below.</p>
                </div>

                {/* Sample Pre-fills */}
                <div className="sample-prompts">
                    <span className="sample-label">Try a sample:</span>
                    {SAMPLE_MESSAGES.map((sample, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className="sample-btn"
                            onClick={() => loadSample(sample.text)}
                        >
                            {sample.label}
                        </button>
                    ))}
                </div>

                <textarea
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        if (error) setError("");
                    }}
                    rows={5}
                    placeholder="Example: URGENT! Your bank account will be blocked in 2 hours. Click here to verify your KYC..."
                />

                <div className="button-row">
                    <button
                        className="analyze-btn"
                        onClick={analyzeMessage}
                        disabled={loading}
                    >
                        {loading ? "🔄 Analyzing..." : "🔍 Analyze Message"}
                    </button>

                    <button className="clear-btn" onClick={clearAll}>
                        Clear
                    </button>
                </div>

                {error && <div className="error-message">⚠️ {error}</div>}
            </div>

            {/* Results Section */}
            {result && (
                <div className={`result-card ${getRiskClass()}`}>
                    {isFallback && (
                        <div className="fallback-badge">
                            ℹ️ Offline Heuristic Analysis (Local Engine)
                        </div>
                    )}

                    <div className="result-header">
                        <div>
                            <span className="result-label">SCAM ANALYSIS RESULT</span>
                            <h2>
                                {result.riskLevel === "HIGH RISK" && "🚨 "}
                                {result.riskLevel === "MEDIUM RISK" && "⚠️ "}
                                {result.riskLevel === "LOW RISK" && "✅ "}
                                {result.riskLevel}
                            </h2>
                        </div>

                        <div className="score-circle">
                            <strong>{result.riskScore}</strong>
                            <span>/100</span>
                        </div>
                    </div>

                    {/* Flagged Warnings */}
                    <div className="result-section">
                        <h3>🔎 Why was this flagged?</h3>
                        {result.warnings && result.warnings.length > 0 ? (
                            <ul>
                                {result.warnings.map((warning, index) => (
                                    <li key={index}>⚠️ {warning}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="clean-msg">✅ No major scam indicators were detected in this text.</p>
                        )}
                    </div>

                    {/* Actionable Safety Advice */}
                    <div className="result-section advice-section">
                        <h3>🛡️ What should you do?</h3>
                        <ul>
                            {result.advice.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="safety-note">
                        <strong>Remember:</strong> Never share your OTP, UPI PIN, passwords, or personal identity numbers with anyone over SMS or call.
                    </div>
                </div>
            )}
        </div>
    );
}

export default ScamDetector;