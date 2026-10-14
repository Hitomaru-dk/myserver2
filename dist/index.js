"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files (for test page)
app.use(express.static(path.join(__dirname, "../public")));
// API Routes
app.use("/api", itemRoutes_1.default);
// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        server: process.env.SERVER_NAME || `Server on port ${PORT}`,
        mongo: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    });
});
// Connect to MongoDB and start server
const MONGO_URI = process.env.MONGO_URI || "";
if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not set in .env file!");
    console.log("Please set MONGO_URI in .env file and restart the server.");
    // Start server anyway for testing the UI
    app.listen(PORT, () => {
        console.log(`⚠️  Server running on http://localhost:${PORT} (WITHOUT MongoDB)`);
    });
}
else {
    mongoose
        .connect(MONGO_URI)
        .then(() => {
        console.log("✅ Connected to MongoDB Atlas!");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
        .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        console.log("⚠️ Starting server in fallback mode...");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT} (Database disconnected)`);
        });
    });
}
