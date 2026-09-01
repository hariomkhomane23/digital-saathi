const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const urlCheckerRoutes = require("./routes/urlCheckerRoutes");
const scamRoutes = require("./routes/scamRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================

app.use(
    cors({
        origin: [
            "http://localhost:5173"
            "https://digital-saathi-hqu9e3rlz-hariomkhomane23s-projects.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

app.use(express.json());

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/url-checker", urlCheckerRoutes);
app.use("/api/scam", scamRoutes);

// ================= HOME ROUTE =================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Digital Saathi API is running"
    });
});

// ================= MONGODB =================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });