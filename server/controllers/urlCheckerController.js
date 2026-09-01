const checkURL = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "URL is required."
            });
        }

        let parsedURL;

        try {
            parsedURL = new URL(url);
        } catch (error) {
            return res.status(400).json({
                message: "Please enter a valid URL."
            });
        }

        const hostname = parsedURL.hostname.toLowerCase();
        const fullURL = url.toLowerCase();

        let riskScore = 0;
        const signals = [];

        // ==========================================
        // 1. HTTP CHECK
        // ==========================================

        if (parsedURL.protocol !== "https:") {
            riskScore += 20;

            signals.push(
                "❌ Website does not use HTTPS."
            );
        } else {
            signals.push(
                "✅ Website uses HTTPS."
            );
        }

        // ==========================================
        // 2. IP ADDRESS IN DOMAIN
        // ==========================================

        const ipPattern =
            /^(\d{1,3}\.){3}\d{1,3}$/;

        if (ipPattern.test(hostname)) {
            riskScore += 30;

            signals.push(
                "❌ Website uses an IP address instead of a normal domain."
            );
        }

        // ==========================================
        // 3. SUSPICIOUS KEYWORDS
        // ==========================================

        const suspiciousWords = [
            "login",
            "verify",
            "verification",
            "secure",
            "security",
            "update",
            "account",
            "bank",
            "payment",
            "wallet",
            "password",
            "otp",
            "kyc",
            "reward",
            "prize",
            "free",
            "urgent",
            "claim",
        ];

        const foundWords = suspiciousWords.filter(
            (word) => fullURL.includes(word)
        );

        if (foundWords.length >= 3) {
            riskScore += 25;

            signals.push(
                `⚠️ Multiple suspicious keywords detected: ${foundWords.join(
                    ", "
                )}.`
            );
        } else if (foundWords.length > 0) {
            riskScore += 10;

            signals.push(
                `⚠️ Suspicious keyword detected: ${foundWords.join(
                    ", "
                )}.`
            );
        }

        // ==========================================
        // 4. DOMAIN LENGTH
        // ==========================================

        if (hostname.length > 40) {
            riskScore += 10;

            signals.push(
                "⚠️ Domain name is unusually long."
            );
        }

        // ==========================================
        // 5. MANY SUBDOMAINS
        // ==========================================

        const subdomainCount =
            hostname.split(".").length - 2;

        if (subdomainCount >= 3) {
            riskScore += 15;

            signals.push(
                "⚠️ Website contains an unusually large number of subdomains."
            );
        }

        // ==========================================
        // 6. SPECIAL CHARACTERS
        // ==========================================

        if (hostname.includes("@")) {
            riskScore += 30;

            signals.push(
                "❌ Suspicious @ symbol detected in the URL."
            );
        }

        // ==========================================
        // 7. URL LENGTH
        // ==========================================

        if (fullURL.length > 150) {
            riskScore += 10;

            signals.push(
                "⚠️ URL is unusually long."
            );
        }

        // ==========================================
        // LIMIT SCORE
        // ==========================================

        if (riskScore > 100) {
            riskScore = 100;
        }

        // ==========================================
        // RISK LEVEL
        // ==========================================

        let riskLevel;
        let message;

        if (riskScore >= 60) {

            riskLevel = "HIGH";

            message =
                "This URL contains several suspicious characteristics. Avoid entering personal, banking, OTP or payment information.";

        } else if (riskScore >= 30) {

            riskLevel = "MEDIUM";

            message =
                "This URL has some characteristics that deserve caution. Verify the website through an official source before continuing.";

        } else {

            riskLevel = "LOW";

            message =
                "No major suspicious characteristics were detected by this basic analysis. This does not guarantee that the website is completely safe.";

        }

        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(200).json({
            success: true,
            url,
            domain: hostname,
            riskScore,
            riskLevel,
            message,
            signals,
        });

    } catch (error) {

        console.error(
            "URL checker error:",
            error
        );

        return res.status(500).json({
            message: "Server error while checking URL."
        });
    }
};

module.exports = {
    checkURL,
};