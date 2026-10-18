import "dotenv/config";
import http from "node:http";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { Server } from "socket.io";
import { connectDatabase } from "./config/db.js";
import api from "./routes/api.js";

const app = express();
const server = http.createServer(app);
const allowedOrigin = (origin, callback) => {
  const configured = process.env.CLIENT_URL;
  if (!origin || origin === configured || /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return callback(null, true);
  return callback(new Error("Origin not allowed by CORS"));
};
const io = new Server(server, {
  cors: { origin: allowedOrigin, credentials: true },
});
app.set("io", io);
app.use(helmet());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "pollverse-api", database: process.env.MONGO_URI ? "configured" : "demo-mode" }));
app.use("/api", api);
app.use((err, _req, res, _next) => { console.error(err); res.status(err.status || 500).json({ message: err.message || "Internal server error" }); });
app.use((_req, res) => res.status(404).json({ message: "Route not found" }));
io.on("connection", (socket) => {
  socket.on("join-poll", (id) => socket.join(`poll:${id}`));
});
const port = Number(process.env.PORT || 5000);
connectDatabase()
  .catch((error) => console.error("MongoDB unavailable; API remains available:", error.message))
  .finally(() => server.listen(port, () => console.log(`PollVerse API listening on ${port}`)));
