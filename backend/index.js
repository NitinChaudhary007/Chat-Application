import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

dotenv.config({});

// middleware
const corsOption = {
  origin: ["http://localhost:3000", "https://technical-edu.loca.lt"],
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Sever is running on ${PORT}`);
});
