import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";
import AuthRoutes from "./routes/AuthRoutes.route.js";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
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
    console.log("Server is running on port", PORT)
});