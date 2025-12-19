import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://epawph-dvztkb52c-daveanchetas-projects.vercel.app',
    'https://*.vercel.app',
    'https://*.railway.app' 
  ],
        credentials: true
    },
});

io.use(socketAuthMiddleware);

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

io.on("connection", (socket) => {
    console.log("A user connected", socket.user.fullname);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.user.fullname);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    });
});

export { io, app, server}