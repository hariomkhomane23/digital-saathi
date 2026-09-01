const express = require("express");

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Please enter a message"
            });
        }

        const text = message.toLowerCase();

        let reply = "";

        // GREETING
        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey") ||
            text.includes("namaste")
        ) {
            reply =
                "Hello! 👋 I am Digital Saathi. I can help you with UPI, PhonePe, Google Pay, WhatsApp, banking safety, online scams, suspicious links and other digital services.";
        }

        // UPI
        else if (text.includes("upi")) {
            reply =
                "UPI allows you to send and receive money using apps such as PhonePe, Google Pay and BHIM. 🔐 Never share your UPI PIN or OTP with anyone. You do not need to enter your UPI PIN to receive money.";
        }

        // PHONEPE
        else if (text.includes("phonepe")) {
            reply =
                "📱 PhonePe Safety Tip: Always verify the receiver's name before making a payment. You never need to enter your UPI PIN to receive money. Never share your OTP, UPI PIN or screen with another person.";
        }

        // GOOGLE PAY
        else if (
            text.includes("google pay") ||
            text.includes("gpay")
        ) {
            reply =
                "📱 Google Pay Safety Tip: Always verify the recipient before sending money. Never share your UPI PIN, OTP or screen-sharing access.";
        }

        // WHATSAPP
        else if (text.includes("whatsapp")) {
            reply =
                "💬 WhatsApp Safety Tip: Be careful with unknown links, unexpected job offers, prize messages and requests for money. Never share OTPs received on your phone.";
        }

        // OTP
        else if (text.includes("otp")) {
            reply =
                "🔐 Never share your OTP with anyone, even if they claim to be from your bank, government department or customer support.";
        }

        // UPI PIN
        else if (text.includes("upi pin") || text.includes("pin")) {
            reply =
                "🔒 Your UPI PIN is secret. Never share it with anyone. You normally enter your UPI PIN only when authorizing a payment.";
        }

        // BANKING
        else if (
            text.includes("bank") ||
            text.includes("banking")
        ) {
            reply =
                "🏦 Banking Safety: Never share your password, OTP, ATM PIN, CVV or UPI PIN. Avoid clicking banking links received through unknown SMS, WhatsApp or email.";
        }

        // SCAM
        else if (
            text.includes("scam") ||
            text.includes("fraud") ||
            text.includes("phishing")
        ) {
            reply =
                "🚨 Scam Safety: Be suspicious of urgent messages asking for money, OTPs, passwords or personal information. Don't click unknown links. Verify the person or organization through an official channel.";
        }

        // PASSWORD
        else if (
            text.includes("password") ||
            text.includes("login")
        ) {
            reply =
                "🔑 Use a strong, unique password and never share it with anyone. Avoid entering passwords through links received from unknown people.";
        }

        // DEFAULT
        else {
            reply =
                "I can help you with Digital Safety, UPI, PhonePe, Google Pay, WhatsApp, banking, OTP safety, online scams and suspicious links. 🔐";
        }

        res.json({
            reply
        });

    } catch (error) {
        console.error("AI error:", error);

        res.status(500).json({
            message: "AI server error"
        });
    }
});

module.exports = router;