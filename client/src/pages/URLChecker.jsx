import { useState } from "react";
import axios from "axios";
import "./URLChecker.css";

function URLChecker() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const checkURL = async (event) => {
        event.preventDefault();

        setError("");
        setResult(null);

        if (!url.trim()) {
            setError("Please enter a URL.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(

                `${import.meta.env.VITE_API_URL}/api/url-checker/check`

              ,
                {
                    url: url.trim(),
                }
            );

            setResult(response.data);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to check this URL. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const getRiskClass = (riskLevel) => {
        if (riskLevel === "HIGH") {
            return "risk-high";
        }

        if (riskLevel === "MEDIUM") {
            return "risk-medium";
        }

        return "risk-low";
    };

    return (
        <div className="url-checker-page">

            <div className="url-checker-container">

                {/* HEADER */}

                <div className="url-checker-header">

                    <div className="url-icon">
                        🔎
                    </div>

                    <h1>
                        Scam Link Checker
                    </h1>

                    <p>
                        Check a suspicious website before opening it.
                    </p>

                </div>

                {/* CHECKER CARD */}

                <div className="checker-card">

                    <h2>
                        🔗 Enter Website URL
                    </h2>

                    <p className="checker-description">
                        Enter the complete website address you want
                        Digital Saathi to analyze.
                    </p>

                    <form onSubmit={checkURL}>

                        <div className="url-input-container">

                            <input
                                type="text"
                                value={url}
                                onChange={(event) =>
                                    setUrl(event.target.value)
                                }
                                placeholder="https://example.com"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Checking..."
                                    : "Check URL"}
                            </button>

                        </div>

                    </form>

                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}

                </div>

                {/* RESULT */}

                {result && (
                    <div className="result-card">

                        <div
                            className={`risk-result ${getRiskClass(
                                result.riskLevel
                            )}`}
                        >

                            <div className="risk-icon">

                                {result.riskLevel === "HIGH"
                                    ? "🚨"
                                    : result.riskLevel === "MEDIUM"
                                    ? "⚠️"
                                    : "✅"}

                            </div>

                            <div>

                                <h2>
                                    {result.riskLevel === "HIGH"
                                        ? "High Risk"
                                        : result.riskLevel === "MEDIUM"
                                        ? "Medium Risk"
                                        : "Low Risk"}
                                </h2>

                                <p>
                                    Risk Score:{" "}
                                    <strong>
                                        {result.riskScore}/100
                                    </strong>
                                </p>

                            </div>

                        </div>

                        {/* CHECKED URL */}

                        <div className="checked-url">

                            <h3>
                                Checked URL
                            </h3>

                            <p>
                                {result.url}
                            </p>

                        </div>

                        {/* MESSAGE */}

                        <div className="result-message">

                            <h3>
                                Assessment
                            </h3>

                            <p>
                                {result.message}
                            </p>

                        </div>

                        {/* SIGNALS */}

                        {result.signals &&
                            result.signals.length > 0 && (
                                <div className="signals-section">

                                    <h3>
                                        🔍 Detected Signals
                                    </h3>

                                    <div className="signals-list">

                                        {result.signals.map(
                                            (signal, index) => (
                                                <div
                                                    className="signal-item"
                                                    key={index}
                                                >
                                                    {signal}
                                                </div>
                                            )
                                        )}

                                    </div>

                                </div>
                            )}

                        {/* SAFETY NOTICE */}

                        <div className="safety-notice">

                            <strong>
                                🛡️ Safety Reminder
                            </strong>

                            <p>
                                A low-risk result does not guarantee
                                that a website is completely safe.
                                Never enter your OTP, UPI PIN,
                                password or banking information on a
                                website unless you are certain it is
                                legitimate.
                            </p>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}

export default URLChecker;