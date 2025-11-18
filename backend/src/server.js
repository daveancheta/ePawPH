import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";
import AuthRoutes from "./routes/AuthRoutes.route.js";

const app = express();

app.use(cors());

const PORT = ENV.PORT || 3000;

app.use("/api/auth", AuthRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
});