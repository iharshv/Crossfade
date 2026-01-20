const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const projectRoutes = require("./routes/projects");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const chatRoutes = require("./routes/chat");

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/videoPortal";
const CLIENT_URL = process.env.CLIENT_URL || "*";

const app = express();
const server = http.createServer(app);

// middleware
const allowedOrigins = [CLIENT_URL];
if (CLIENT_URL.endsWith("/")) {
  allowedOrigins.push(CLIENT_URL.slice(0, -1));
} else if (CLIENT_URL !== "*") {
  allowedOrigins.push(CLIENT_URL + "/");
}

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// database connection
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds if MongoDB is unreachable
})
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => {
    console.error("CRITICAL: MongoDB Connection Failed!");
    console.error(err);
  });

// routes
app.use("/projects", projectRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/chat", chatRoutes);

// Socket.io logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_project", (projectId) => {
    socket.join(projectId);
    console.log(`User ${socket.id} joined project: ${projectId}`);
  });

  socket.on("send_message", (data) => {
    // Broadcast to everyone in the project room
    io.to(data.projectId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
