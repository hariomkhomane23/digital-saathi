const express = require("express");

const router = express.Router();

// POST /api/scam/analyze
router.post("/analyze", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide a message to analyze."
            });
        }

        const message = text.toLowerCase();

        let riskScore = 0;
        const warnings = [];

        // Urgency
        const urgencyWords = [
            "urgent",
            "immediately",
            "today",
            "now",
            "within 24 hours",
            "account will be blocked"
        ];

        if (urgencyWords.some(word => message.includes(word))) {
            riskScore += 20;
            warnings.push("Uses urgent or threatening language");
        }

        // Money / prize
        const moneyWords = [
            "won",
            "prize",
            "lottery",
            "reward",
            "cashback",
            "₹",
            "rs",
            "rupees",
            "payment"
        ];

        if (moneyWords.some(word => message.includes(word))) {
            riskScore += 20;
            warnings.push("Contains a money or reward-related claim");
        }

        // Sensitive information
        const sensitiveWords = [
            "otp",
            "pin",
            "upi pin",
            "password",
            "cvv",
            "card number",
            "bank details",
            "aadhaar"
        ];

        if (sensitiveWords.some(word => message.includes(word))) {
            riskScore += 30;
            warnings.push("May be requesting sensitive personal or financial information");
        }

        // Suspicious actions
        const suspiciousWords = [
            "click this link",
            "click here",
            "verify your account",
            "kyc",
            "update kyc",
            "claim now",
            "send money",
            "pay now"
        ];

        if (suspiciousWords.some(word => message.includes(word))) {
            riskScore += 20;
            warnings.push("Contains a suspicious request or action");
        }

        // Link detection
        if (
            message.includes("http://") ||
            message.includes("https://") ||
            message.includes("www.")
        ) {
            riskScore += 10;
            warnings.push("Contains a website link");
        }

        // Maximum score
        riskScore = Math.min(riskScore, 100);

        let riskLevel;

        if (riskScore >= 70) {
            riskLevel = "HIGH RISK";
        } else if (riskScore >= 40) {
            riskLevel = "MEDIUM RISK";
        } else {
            riskLevel = "LOW RISK";
        }

        const advice =
            riskScore >= 70
                ? [
                    "Do not click suspicious links.",
                    "Do not share OTP, UPI PIN, password or card details.",
                    "Do not send money to unknown people.",
                    "Verify the message using the organization's official website or app."
                ]
                : riskScore >= 40
                    ? [
                        "Be careful before responding.",
                        "Verify the sender independently.",
                        "Never share OTP or UPI PIN.",
                        "Avoid clicking unknown links."
                    ]
                    : [
                        "No major scam indicators were detected.",
                        "Still verify unexpected messages before taking action.",
                        "Never share your OTP or UPI PIN."
                    ];

        res.json({
            success: true,
            riskScore,
            riskLevel,
            warnings,
            advice
        });

    } catch (error) {
        console.error("Scam analysis error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong while analyzing the message."
        });
    }
});

module.exports = router;