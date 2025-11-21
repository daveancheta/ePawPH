import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";
import AuthRoutes from "./routes/AuthRoutes.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));
app.use(cookieParser())

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use("/api/auth", AuthRoutes);

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get((_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    connectDB()
});