import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";
import AuthRoutes from "./routes/AuthRoutes.route.js";
import PostRoutes from "./routes/PostRoutes.route.js";
import UserRoutes from "./routes/UserRoutes.route.js";
import FollowRoutes from "./routes/FollowRoutes.route.js";
import MessageRoutes from "./routes/MessageRoutes.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import { app, server } from "./lib/socket.js";

dotenv.config();

app.use(express.json({ limit: '10mb' }))
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://epawph-dvztkb52c-daveanchetas-projects.vercel.app',
        'https://*.vercel.app',
        'https://*.railway.app'
    ], credentials: true
}));
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Frontend build path (two levels up from src)
const frontendPath = path.join(__dirname, "../../frontend/dist")

const PORT = ENV.PORT || 3000;

app.use("/api/auth", AuthRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/follow", FollowRoutes);
app.use("/api/message", MessageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(frontendPath));

    // Regex works in Express 5.x
    app.get(/^\/.*$/, (req, res) => {
        res.sendFile(path.join(frontendPath, "/index.html"));
    });
}

server.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    connectDB()
});
